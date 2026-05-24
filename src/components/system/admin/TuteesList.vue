<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const tutees = ref([])
const loading = ref(true)
const searchQuery = ref('')
const headers = [
  { title: 'Email', value: 'email' },
  { title: 'Full Name', value: 'full_name' },
  { title: 'Registration Date', value: 'created_at' },
  { title: 'Actions', value: 'actions', sortable: false },
]

const loadTutees = async () => {
  loading.value = true
  try {
    // Fetch all users with tutee role
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'tutee')
      .order('created_at', { ascending: false })

    if (error) throw error
    tutees.value = data || []
  } catch (error) {
    console.error('Error loading tutees:', error)
  } finally {
    loading.value = false
  }
}

const deleteTutee = async (tuteeId) => {
  if (!confirm('Are you sure you want to delete this tutee?')) return

  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', tuteeId)

    if (error) throw error
    tutees.value = tutees.value.filter((t) => t.id !== tuteeId)
  } catch (error) {
    console.error('Error deleting tutee:', error)
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
  loadTutees()
})
</script>

<template>
  <div>
    <div class="mb-4 d-flex gap-2 align-center">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search tutees by email or name..."
        variant="outlined"
        density="comfortable"
        hide-details
        class="flex-grow-1"
      />
      <v-btn color="primary" @click="loadTutees" :loading="loading">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <v-data-table
      :items="tutees.filter((t) => !searchQuery || t.email.toLowerCase().includes(searchQuery.toLowerCase()) || (t.full_name && t.full_name.toLowerCase().includes(searchQuery.toLowerCase())))"
      :headers="headers"
      :loading="loading"
      item-key="id"
      class="elevation-1"
    >
      <template #item.created_at="{ item }">
        <span>{{ formatDate(item.created_at) }}</span>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <v-btn
            icon="mdi-delete"
            size="small"
            variant="text"
            color="error"
            @click="deleteTutee(item.id)"
          ></v-btn>
        </div>
      </template>

      <template #no-data>
        <v-empty-state
          headline="No tutees found"
          text="There are no tutees in the system yet."
        ></v-empty-state>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>
