<script setup>
import { useRouter } from 'vue-router'
import TutorRegisterForm from '@/components/auth/TutorRegisterForm.vue'

const router = useRouter()
const goBackToLogin = () => router.push('/')
</script>

<template>
  <div class="auth-page">
    <div class="auth-header">
      <v-btn icon @click="goBackToLogin" class="back-button">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2>Apply to be a Tutor</h2>
    </div>
    <TutorRegisterForm />
  </div>
</template>

<style scoped>
.auth-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}

.auth-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.back-button {
  position: absolute;
  top: 24px;
  left: 24px;
}

h2 {
  margin: 0;
  padding-left: 56px;
}
</style>
