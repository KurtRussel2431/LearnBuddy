<script setup>
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'
import { onMounted } from 'vue'

const { mdAndDown } = useDisplay()
const authStore = useAuthUserStore()

onMounted(async () => {
  if (!authStore.userData) {
    await authStore.getUserInformation()
  }
})
</script>

<template>
  <v-card
    :min-height="mdAndDown ? undefined : '370px'"
    class="welcome-card"
    elevation="2"
    rounded="lg"
  >
    <v-card-text class="pa-6">
        <v-alert v-if="authStore.userData?.role === 'tutor' && !authStore.userData?.is_approved" type="info" class="mb-4">
          Your tutor application is submitted and awaiting admin approval. The head admin will review your
          application and contact you for interview.
        </v-alert>
      <v-row>
        <v-col cols="12" sm="4" class="d-flex align-center justify-center">
          <v-img
            src="/images/Learningbuddy.png"
            :width="mdAndDown ? '80%' : '100%'"
            class="rounded-lg"
            alt="Learningbuddy Logo"
          ></v-img>
        </v-col>

        <v-col cols="12" sm="8" class="text-center">
          <h1 class="text-h4 font-weight-bold mb-4">
            Welcome to Learningbuddy
            <span v-if="authStore.userData" class="orange--text text--darken-3">
              {{ authStore.userData.firstname + ' ' + authStore.userData.lastname }}!
            </span>
            <span v-else>Guest!</span>
          </h1>

          <p class="text-body-1">
            Welcome to your personalized learning dashboard! Here you can track your upcoming
            tutoring sessions, access study materials, and connect with your tutors. Stay organized
            and boost your academic performance with our comprehensive learning tools. Your
            educational journey starts here!
          </p>

          <v-row class="mt-4">
            <v-col cols="6">
              <v-card-text class="text-center">
                <v-icon size="64" color="orange" class="mb-4">mdi-calendar-check</v-icon>
                <div class="text-h6 orange--text text--darken-3 font-weight-bold mb-2">
                  My Sessions
                </div>
                <div class="text-body-2 mb-4">Check your upcoming tutoring schedule</div>
                <v-btn
                  color="orange"
                  class="text-black text-h6"
                  block
                  height="56"
                  rounded="lg"
                  :to="'/sessions'"
                  aria-label="View Sessions"
                >
                  View Sessions
                </v-btn>
              </v-card-text>
            </v-col>
            <v-col cols="6">
              <v-card-text class="text-center">
                <v-icon size="64" color="orange" class="mb-4">mdi-account-group</v-icon>
                <div class="text-h6 orange--text text--darken-3 font-weight-bold mb-2">
                  Find Tutors
                </div>
                <div class="text-body-2 mb-4">Connect with expert tutors in your subject area</div>
                <v-btn
                  color="orange"
                  class="text-black text-h6"
                  block
                  height="56"
                  rounded="lg"
                  :to="'/tutors'"
                  aria-label="Browse Tutors"
                >
                  Browse Tutors
                </v-btn>
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.welcome-card {
  background: linear-gradient(135deg, #ffffff 0%, #fff8e1 100%);
  border: 1px solid rgba(255, 213, 79, 0.2);
}

.text-h4 {
  color: #2c3e50;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.text-body-1 {
  color: #546e7a;
  line-height: 1.6;
}

.text-body-2 {
  color: #78909c;
}

@media (max-width: 600px) {
  .welcome-card {
    margin: 12px;
  }

  .text-h4 {
    font-size: 1.5rem !important;
  }
}
</style>
