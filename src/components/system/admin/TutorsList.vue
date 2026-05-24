<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const tutors = ref([])
const loading = ref(true)
const searchQuery = ref('')
const headers = [
  { title: 'Email', value: 'email' },
  { title: 'Full Name', value: 'name' },
  { title: 'Program', value: 'program' },
  { title: 'Subjects', value: 'subjects' },
  { title: 'Registration Date', value: 'created_at' },
  { title: 'Actions', value: 'actions', sortable: false },
]

const loadTutors = async () => {
  loading.value = true
  try {
    // Fetch all approved tutor applications
    const { data, error } = await supabase
      .from('tutor_applications')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) throw error
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

      tutors.value = apps.map((app) => {
        const prof = profileMap[app.user_id]
        return {
          ...app,
          email: app.email || (prof ? prof.email : ''),
          name: app.name || (prof ? prof.full_name || (prof.firstname && prof.lastname ? `${prof.firstname} ${prof.lastname}` : '') : ''),
        }
      })
    } else {
      tutors.value = apps
    }
  } catch (error) {
    console.error('Error loading tutors:', error)
  } finally {
    loading.value = false
  }
}

const deleteTutor = async (tutorId) => {
  if (!confirm('Are you sure you want to delete this tutor?')) return

  try {
    const { error } = await supabase
      .from('tutor_applications')
      .delete()
      .eq('id', tutorId)

    if (error) throw error
    tutors.value = tutors.value.filter((t) => t.id !== tutorId)
  } catch (error) {
    console.error('Error deleting tutor:', error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatSubjects = (subjects) => {
  if (Array.isArray(subjects)) {
    return subjects.join(', ')
  }
  return subjects
}

onMounted(() => {
  loadTutors()
})
</script>

<template>
  <div>
    <div class="mb-4 d-flex gap-2 align-center">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search tutors by email or name..."
        variant="outlined"
        density="comfortable"
        hide-details
        class="flex-grow-1"
      />
      <v-btn color="primary" @click="loadTutors" :loading="loading">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <v-data-table
      :items="tutors.filter((t) => !searchQuery || t.email.toLowerCase().includes(searchQuery.toLowerCase()) || (t.name && t.name.toLowerCase().includes(searchQuery.toLowerCase())))"
      :headers="headers"
      :loading="loading"
      item-key="id"
      class="elevation-1"
    >
      <template #item.created_at="{ item }">
        <span>{{ formatDate(item.created_at) }}</span>
      </template>

      <template #item.subjects="{ item }">
        <v-chip size="small" v-for="(subject, idx) in (Array.isArray(item.subjects) ? item.subjects : [])">
          {{ subject }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <v-btn
            icon="mdi-delete"
            size="small"
            variant="text"
            color="error"
            @click="deleteTutor(item.id)"
          ></v-btn>
        </div>
      </template>

      <template #no-data>
        <v-empty-state
          headline="No tutors found"
          text="There are no approved tutors in the system yet."
        ></v-empty-state>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
