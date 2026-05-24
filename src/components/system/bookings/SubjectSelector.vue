<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { tutors } from '@/stores/tutors.js'

// Props
const props = defineProps({
  selectedSubject: String,
})

// Emits
const emit = defineEmits(['update-subject'])

// Extract subjects from tutors and deduplicate
const subjects = ref([...new Set(tutors.flatMap((tutor) => tutor.subjects))].sort())

// Two-way binding proxy
const selectedSubjectProxy = computed({
  get: () => props.selectedSubject,
  set: (value) => emit('update-subject', value),
})
</script>

<template>
  <v-form>
    <v-select
      v-model="selectedSubjectProxy"
      :items="subjects"
      label="Select Subject"
      outlined
      dense
      clearable
      prepend-icon="mdi-book"
    ></v-select>
  </v-form>
</template>
