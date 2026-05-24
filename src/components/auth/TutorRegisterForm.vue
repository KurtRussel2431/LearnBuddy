<script setup>
import { computed, ref } from 'vue'
import { useTutorRegister } from '@/composables/auth/tutorRegister'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import AlertNotification from '@/components/common/AlertNotification.vue'

const { formData, formAction, refVForm, onFormSubmit } = useTutorRegister()

const roles = ['Student', 'Teacher']
const programs = [
  'BS-Information Technology',
  'BS-Computer Science',
  'BS-Education(Math)',
]
const subjectMap = {
  'BS-Information Technology': ['Java', 'CSS', 'HTML', 'JavaScript'],
  'BS-Computer Science': ['Java', 'Algorithms', 'Data Structures', 'Python'],
  'BS-Education(Math)': ['Algebra', 'Calculus', 'Statistics', 'Geometry'],
}
const subjectOptions = computed(() => subjectMap[formData.value.program] || [])
</script>

<template>
  <AlertNotification
    :formSuccessMessage="formAction.formSuccessMessage"
    :formErrorMessage="formAction.formErrorMessage"
  />

  <v-form ref="refVForm" @submit.prevent="onFormSubmit" class="auth-form">
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="formData.name"
          label="Full Name"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          density="comfortable"
          :rules="[(v) => !!v || 'Name is required']"
        />
      </v-col>

      <v-col cols="12">
        <v-select
          v-model="formData.program"
          :items="programs"
          label="Program"
          variant="outlined"
          prepend-inner-icon="mdi-school"
          density="comfortable"
          :rules="[(v) => !!v || 'Program is required']"
        />
      </v-col>

      <v-col cols="12">
        <v-select
          v-model="formData.subjects"
          :items="subjectOptions"
          label="Subjects you can teach"
          variant="outlined"
          prepend-inner-icon="mdi-book-open-page-variant"
          density="comfortable"
          multiple
          chips
          :rules="[(v) => (v && v.length > 0) || 'Select at least one subject']"
          :disabled="!formData.program"
          hint="Subject options update based on selected program"
          persistent-hint
        />
      </v-col>

      <v-col cols="12">
        <v-select
          v-model="formData.role"
          :items="roles"
          label="Role"
          variant="outlined"
          prepend-inner-icon="mdi-account-circle"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          label="Email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          density="comfortable"
          :rules="[requiredValidator, emailValidator]"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.password"
          label="Password"
          type="password"
          variant="outlined"
          prepend-inner-icon="mdi-lock-outline"
          density="comfortable"
          :rules="[requiredValidator, passwordValidator]"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.contact"
          label="Contact (email or phone)"
          variant="outlined"
          prepend-inner-icon="mdi-phone"
          density="comfortable"
        />
      </v-col>
    </v-row>

    <v-btn
      block
      type="submit"
      :loading="formAction.formProcess"
      :disabled="formAction.formProcess"
      color="#1976D2"
      class="mt-4"
    >
      Submit Application
    </v-btn>
  </v-form>
</template>

<style scoped>
.auth-form {
  max-width: 620px;
}
</style>
