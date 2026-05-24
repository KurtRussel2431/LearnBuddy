<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { ref } from 'vue'
import { useRegister } from '@/composables/auth/register'
import AlertNotification from '@/components/common/AlertNotification.vue'

defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const { formData, formAction, refVForm, onFormSubmit } = useRegister()
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
</script>

<template>
  <AlertNotification
    :formSuccessMessage="formAction.formSuccessMessage"
    :formErrorMessage="formAction.formErrorMessage"
  />

  <v-form ref="refVForm" @submit.prevent="onFormSubmit" class="auth-form">
    <!-- Basic Information -->
    <v-row dense>
      <v-col cols="6">
        <v-text-field
          v-model="formData.firstname"
          label="First Name"
          :rules="[requiredValidator]"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          density="comfortable"
        />
      </v-col>

      <v-col cols="6">
        <v-text-field
          v-model="formData.lastname"
          label="Last Name"
          :rules="[requiredValidator]"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          density="comfortable"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          label="Email"
          :rules="[requiredValidator, emailValidator]"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          density="comfortable"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="formData.program"
          label="Program"
          :rules="[requiredValidator]"
          variant="outlined"
          prepend-inner-icon="mdi-school"
          density="comfortable"
          placeholder="Your Program of Study"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.password"
          label="Password"
          variant="outlined"
          class="mb-3"
          :type="isPasswordVisible ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          :rules="[requiredValidator, passwordValidator]"
          :disabled="formAction.formProcess"
          hide-details="auto"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.confirmPassword"
          label="Confirm password"
          variant="outlined"
          class="mb-3"
          :type="isConfirmPasswordVisible ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
          :rules="[requiredValidator, (val) => confirmedValidator(val, formData.password)]"
          :disabled="formAction.formProcess"
          hide-details="auto"
        />
      </v-col>
    </v-row>

    <v-btn
      block
      type="submit"
      :loading="formAction.formProcess"
      :disabled="formAction.formProcess"
      color="#F57C51"
      class="register-btn mt-4"
    >
      Register as Tutee
    </v-btn>

    <v-col class="text-center mt-4">
      <RouterLink to="/" class="signin-link"> Already have an account? Sign In </RouterLink>
    </v-col>
  </v-form>
</template>

<style scoped>
.register-btn {
  height: 48px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #f6f8e2 !important;
  transition: all 0.3s ease;
}

.register-btn:hover {
  background-color: #fcbc58 !important;
  transform: translateY(-2px);
}

.signin-link {
  color: #f57c51 !important;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.signin-link:hover {
  color: #fcbc58 !important;
  text-decoration: underline;
}
</style>
