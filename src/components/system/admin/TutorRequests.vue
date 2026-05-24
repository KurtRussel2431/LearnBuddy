<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const requests = ref([])
const loading = ref(true)
const searchQuery = ref('')
const headers = [
  { title: 'Email', value: 'email' },
  { title: 'Full Name', value: 'name' },
  { title: 'Program', value: 'program' },
  { title: 'Subjects', value: 'subjects' },
  { title: 'Request Date', value: 'created_at' },
  { title: 'Actions', value: 'actions', sortable: false },
]

const loadRequests = async () => {
  loading.value = true
  try {
    // Fetch all pending tutor registration requests from tutor_applications table
    const { data, error } = await supabase
      .from('tutor_applications')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })

    if (error) throw error
    // Resolve emails and names from profiles when email column is not present
    const apps = data || []
    const userIds = apps.map((a) => a.user_id).filter(Boolean)
    if (userIds.length) {
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, email, full_name, firstname, lastname')
        .in('id', userIds)

      const profileMap = (profiles || []).reduce((acc, p) => {
        acc[p.id] = p
        return acc
      }, {})

      requests.value = apps.map((app) => {
        const prof = profileMap[app.user_id]
        return {
          ...app,
          email: app.email || (prof ? prof.email : ''),
          name:
            app.name ||
            (prof ? prof.full_name || (prof.firstname && prof.lastname ? `${prof.firstname} ${prof.lastname}` : '') : ''),
        }
      })
    } else {
      requests.value = apps
    }
  } catch (error) {
    console.error('Error loading requests:', error)
  } finally {
    loading.value = false
  }
}

const approveTutor = async (applicationId, userId) => {
  try {
    // Update application status to approved
    const { error: updateError } = await supabase
      .from('tutor_applications')
      .update({ status: 'approved' })
      .eq('id', applicationId)

    if (updateError) throw updateError

    // Create or update profile with tutor role
    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          role: 'tutor',
          is_approved: true,
        })

      if (profileError) console.warn('Profile update warning:', profileError)
    }

    // Remove from pending list
    requests.value = requests.value.filter((r) => r.id !== applicationId)
  } catch (error) {
    console.error('Error approving tutor:', error)
  }
}

const rejectTutor = async (applicationId) => {
  if (!confirm('Are you sure you want to reject this tutor request?')) return

  try {
    const { error } = await supabase
      .from('tutor_applications')
      .update({ status: 'rejected' })
      .eq('id', applicationId)

    if (error) throw error

    // Remove from pending list
    requests.value = requests.value.filter((r) => r.id !== applicationId)
  } catch (error) {
    console.error('Error rejecting tutor:', error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(() => {
  loadRequests()
})
</script>

<template>
  <div>
    <div class="mb-4 d-flex gap-2 align-center">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search requests by email or name..."
        variant="outlined"
        density="comfortable"
        hide-details
        class="flex-grow-1"
      />
      <v-btn color="primary" @click="loadRequests" :loading="loading">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <v-data-table
      :items="requests.filter((r) => !searchQuery || r.email.toLowerCase().includes(searchQuery.toLowerCase()) || (r.name && r.name.toLowerCase().includes(searchQuery.toLowerCase())))"
      :headers="headers"
      :loading="loading"
      item-key="id"
      class="elevation-1"
    >
      <template #item.created_at="{ item }">
        <span>{{ formatDate(item.created_at) }}</span>
      </template>

      <template #item.subjects="{ item }">
        <v-chip
          size="small"
          v-for="(subject, idx) in (Array.isArray(item.subjects) ? item.subjects : [])"
          :key="idx"
        >
          {{ subject }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <v-btn
            icon="mdi-check"
            size="small"
            variant="text"
            color="success"
            @click="approveTutor(item.id, item.user_id)"
            title="Approve tutor"
          ></v-btn>
          <v-btn
            icon="mdi-close"
            size="small"
            variant="text"
            color="error"
            @click="rejectTutor(item.id)"
            title="Reject request"
          ></v-btn>
        </div>
      </template>

      <template #no-data>
        <v-empty-state
          headline="No pending requests"
          text="All tutor registration requests have been processed."
        ></v-empty-state>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
