<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'
import { useLogin } from '@/composables/auth/login'

const { formData, formAction, refVForm, onFormSubmit } = useLogin()
const isPasswordVisible = ref(false)

// Remove inject vuetify
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form ref="refVForm" @submit.prevent="onFormSubmit" class="auth-form">
    <v-text-field
      v-model="formData.email"
      label="Email address"
      variant="outlined"
      class="mb-3"
      type="email"
      prepend-inner-icon="mdi-email"
      :rules="[requiredValidator, emailValidator]"
      :disabled="formAction.formProcess"
      hide-details="auto"
    ></v-text-field>

    <!-- Password Field -->
    <v-text-field
      v-model="formData.password"
      label="Password"
      variant="outlined"
      :type="isPasswordVisible ? 'text' : 'password'"
      class="mb-3"
      prepend-inner-icon="mdi-lock-outline"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      :rules="[requiredValidator]"
      :disabled="formAction.formProcess"
      hide-details="auto"
    ></v-text-field>

    <!-- Login Button -->
    <v-btn
      color="#F57C51"
      class="login-btn"
      prepend-icon="mdi-login"
      type="submit"
      :loading="formAction.formProcess"
      :disabled="formAction.formProcess"
      block
    >
      Login
    </v-btn>
  </v-form>
</template>

<style scoped>
.login-btn {
  margin-top: 1rem;
  height: 48px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: white !important;
  background-color: #f57c51 !important;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background-color: #fcbc58 !important;
  transform: translateY(-2px);
}
</style>
