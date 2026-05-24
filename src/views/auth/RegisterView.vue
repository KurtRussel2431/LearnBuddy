<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { useDisplay } from 'vuetify'
import { computed } from 'vue'

const { mobile, width } = useDisplay()
const isCompact = computed(() => mobile.value || width.value < 960)

const cardStyles = computed(() => ({
  'pa-8': !isCompact.value,
  'pa-4': isCompact.value,
  'max-width': isCompact.value ? '100%' : '1000px', // Increased max-width
}))
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="register-container">
        <v-row no-gutters align="center" justify="center" class="fill-height">
          <v-card class="registration-card" elevation="8" v-bind="cardStyles">
            <!-- Left Section with Image and Text -->
            <v-row>
              <v-col v-if="!isCompact" cols="12" md="5" class="left-section pa-8">
                <div class="image-container py-10 mx-auto">
                  <v-img
                    src="/images/tutor-illustration.jpg"
                    alt="Become a Tutee"
                    class="rounded-lg"
                    cover
                  />
                </div>
                <div class="benefits-section">
                  <h3 class="text-h6 font-weight-bold mb-4">Why Join as a Student?</h3>
                  <v-list class="benefits-list">
                    <v-list-item
                      v-for="(benefit, index) in [
                        'Flexible learning schedule',
                        'Access to a variety of subjects',
                        'Personalized learning experience',
                        'Connect with motivated students',
                      ]"
                      :key="index"
                      class="benefit-item"
                    >
                      <template v-slot:prepend>
                        <v-icon color="amber-darken-2" class="mr-2">mdi-check-circle</v-icon>
                      </template>
                      {{ benefit }}
                    </v-list-item>
                  </v-list>
                </div>
              </v-col>

              <!-- Right Section with Form -->
              <v-col cols="12" :md="isCompact ? 12 : 7" class="right-section">
                <div class="form-container pa-6 mt-10">
                  <div class="header-top mb-8">
                    <RouterLink to="/" class="back-icon">
                      <v-btn icon>
                        <v-icon>mdi-arrow-left</v-icon>
                      </v-btn>
                    </RouterLink>
                    <div class="header-text">
                      <h1 :class="isCompact ? 'text-h5' : 'text-h4'" class="font-weight-bold mb-2">
                        Become a Tutee
                      </h1>
                      <p class="text-body-1 text-grey-darken-1">
                        Join our community of students and start learning today!
                      </p>
                    </div>
                  </div>
                  <RegisterForm :is-mobile="isCompact" />
                  <div class="text-center mt-6 tutor-prompt">
                    <p class="mb-2">Looking to register as a tutor instead?</p>
                    <RouterLink to="/tutor-register" class="tutor-link">Apply as a Tutor</RouterLink>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.register-container {
  background: linear-gradient(135deg, #ffd54f20 0%, #ffecb320 100%);
  min-height: 100vh;
  padding: 24px;
}

.registration-card {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1) !important;
}

.left-section {
  background: linear-gradient(135deg, #fff8e1 0%, #fffde7 100%);
  border-right: 1px solid #eee;
}

.image-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.benefits-section {
  padding: 20px 0;
}

.benefits-list {
  background: transparent !important;
}

.benefit-item {
  padding: 12px 0;
  min-height: 44px;
  transition: all 0.3s ease;
}

.benefit-item:hover {
  background: #fff8e140;
  transform: translateX(4px);
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.header-top {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  position: relative;
}

.back-icon {
  position: absolute;
  top: 0;
  left: 0;
}

.header-text {
  padding-left: 56px;
}

@media (max-width: 960px) {
  .tutor-container {
    padding: 16px;
  }

  .registration-card {
    margin: 0;
    border-radius: 12px;
  }

  .form-container {
    padding: 16px !important;
  }
}

.tutor-prompt {
  color: #424242;
}

.tutor-link {
  color: #1976d2;
  font-weight: 700;
  text-decoration: none;
}

.tutor-link:hover {
  text-decoration: underline;
}
</style>
