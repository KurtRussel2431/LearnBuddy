<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useToast } from 'vue-toastification'
import SessionsReschedule from './SessionsReschedule.vue'

import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'

const router = useRouter()

const goToDashboard = () => {
  router.push('/dashboard') // make sure this route exists in your app
}

const toast = useToast()

const tab = ref(null)
const showReschedule = ref(false)
const selectedSession = ref(null)

const sessions = ref(JSON.parse(localStorage.getItem('sessions') || '[]'))
const authStore = useAuthUserStore()
const tutorEmail = computed(() => authStore.userData?.email)
const tutorName = computed(() => `${authStore.userData?.firstname ?? ''} ${authStore.userData?.lastname ?? ''}`.trim())
const tutorId = computed(() => authStore.userData?.id)
const isTutorUser = computed(() => authStore.userRole === 'Tutor')

const upcomingSessions = computed(() => {
  const now = new Date()
  // If user is a tutor, only show sessions assigned to them
  return sessions.value.filter((s) => {
    const isFuture = new Date(s.date) >= now
    if (tutorId.value) {
      return isFuture && (s.tutorId ? s.tutorId === tutorId.value : false)
    }

    if (!tutorEmail.value && !tutorName.value) return isFuture

    const matchesEmail = s.tutorEmail ? s.tutorEmail === tutorEmail.value : false
    const matchesName = s.tutor ? s.tutor === tutorName.value : false
    return isFuture && (matchesEmail || matchesName)
  })
})

const pastSessions = computed(() => {
  const now = new Date()
  return sessions.value.filter((s) => {
    const isPast = new Date(s.date) < now
    if (tutorId.value) {
      return isPast && (s.tutorId ? s.tutorId === tutorId.value : false)
    }

    if (!tutorEmail.value && !tutorName.value) return isPast

    const matchesEmail = s.tutorEmail ? s.tutorEmail === tutorEmail.value : false
    const matchesName = s.tutor ? s.tutor === tutorName.value : false
    return isPast && (matchesEmail || matchesName)
  })
})

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const handleStorageChange = (e) => {
  if (e.key === 'sessions') {
    sessions.value = JSON.parse(e.newValue || '[]')
  }
}

onMounted(() => {
  window.addEventListener('storage', handleStorageChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorageChange)
})

const openReschedule = (session) => {
  selectedSession.value = session
  showReschedule.value = true
}

const handleReschedule = (updatedSession) => {
  const index = sessions.value.findIndex((s) => s.id === updatedSession.id)
  if (index !== -1) {
    sessions.value[index] = updatedSession
    localStorage.setItem('sessions', JSON.stringify(sessions.value))
    showReschedule.value = false
    toast.success('Session rescheduled successfully!')
  }
}

const cancelSession = (sessionId) => {
  const toastId = toast.info('Are you sure you want to cancel this session?', {
    timeout: false,
    closeOnClick: false,
    closeButton: false,
    position: 'top-center',
    containerClassName: 'cancel-session-toast',
    component: {
      template: `
        <div class="d-flex justify-space-between align-center pa-2">
          <span>Are you sure you want to cancel this session?</span>
          <div class="ml-4">
            <v-btn color="error" size="small" class="mr-2" @click="confirmCancel">Yes</v-btn>
            <v-btn color="primary" size="small" @click="cancelAction">No</v-btn>
          </div>
        </div>
      `,
      methods: {
        confirmCancel() {
          this.$emit('action')
        },
        cancelAction() {
          this.$emit('cancel')
        },
      },
    },
    action: {
      onClick: () => {
        sessions.value = sessions.value.filter((s) => s.id !== sessionId)
        localStorage.setItem('sessions', JSON.stringify(sessions.value))
        toast.dismiss(toastId)
        toast.success('Session cancelled successfully!')
      },
    },
    cancel: {
      onClick: () => {
        toast.dismiss(toastId)
      },
    },
  })
}
</script>

<template>
  <v-responsive>
    <v-app>
      <v-container fluid class="pa-6 sessions-background">
        <v-card class="mx-auto session-card-container" max-width="1200">
          <v-card-actions class="d-flex justify-start px-6 pt-6">
            <v-btn color="primary" variant="text" @click="goToDashboard">
              <v-icon left>mdi-arrow-left</v-icon>
              Back to Dashboard
            </v-btn>
          </v-card-actions>
          <v-card-title class="text-h4 font-weight-bold text-center py-6">
            My Sessions
            <div class="text-subtitle-1 mt-2 text-grey">Manage your tutoring sessions</div>
          </v-card-title>

          <v-tabs v-model="tab" centered color="amber-darken-2">
            <v-tab value="upcoming" class="text-subtitle-1">Upcoming Sessions</v-tab>
            <v-tab value="past" class="text-subtitle-1">Past Sessions</v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <!-- Upcoming Sessions -->
            <v-window-item value="upcoming">
              <v-container v-if="upcomingSessions.length > 0">
                <v-row>
                  <v-col v-for="session in upcomingSessions" :key="session.id" cols="12" md="6">
                    <v-card class="ma-2 session-card" elevation="2">
                      <v-card-title class="text-h6 amber lighten-4 py-3">
                        {{ session.subject }}
                      </v-card-title>
                      <v-card-text class="pt-4">
                        <v-row no-gutters>
                          <v-col cols="12">
                            <div class="d-flex align-center mb-2">
                              <v-icon color="amber-darken-2" class="mr-2">mdi-calendar</v-icon>
                              <strong>Date:</strong>&nbsp;{{ formatDate(session.date) }}
                            </div>
                            <div class="d-flex align-center mb-2">
                              <v-icon color="amber-darken-2" class="mr-2">mdi-clock-outline</v-icon>
                              <strong>Time:</strong>&nbsp;{{ session.time }}
                            </div>
                            <div class="d-flex align-center mb-2">
                              <v-icon color="amber-darken-2" class="mr-2">mdi-map-marker</v-icon>
                              <strong>Location:</strong>&nbsp;{{ session.location }}
                            </div>
                            <div class="d-flex align-center">
                              <v-icon color="amber-darken-2" class="mr-2">mdi-account</v-icon>
                              <strong>Tutor:</strong>&nbsp;{{ session.tutor }}
                            </div>
                            <div class="d-flex mt-4">
                              <v-spacer></v-spacer>
                              <v-btn
                                color="amber"
                                variant="outlined"
                                class="mr-2"
                                @click="openReschedule(session)"
                              >
                                <v-icon left>mdi-calendar-clock</v-icon>
                                Reschedule
                              </v-btn>
                              <v-btn
                                color="error"
                                variant="outlined"
                                @click="cancelSession(session.id)"
                              >
                                <v-icon left>mdi-cancel</v-icon>
                                Cancel
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
              <v-container v-else>
                <p class="text-center text-body-1 pa-6">
                  <template v-if="isTutorUser">
                    You have no upcoming session requests. Check your bookings or share your
                    availability so students can book you.
                  </template>
                  <template v-else>
                    No upcoming sessions scheduled
                  </template>
                </p>
              </v-container>
            </v-window-item>

            <!-- Past Sessions -->
            <v-window-item value="past">
              <v-container v-if="pastSessions.length > 0">
                <v-row>
                  <v-col v-for="session in pastSessions" :key="session.id" cols="12" md="6">
                    <v-card class="ma-2 session-card" elevation="2">
                      <v-card-title class="text-h6">{{ session.subject }}</v-card-title>
                      <v-card-text>
                        <div><strong>Date:</strong> {{ formatDate(session.date) }}</div>
                        <div><strong>Time:</strong> {{ session.time }}</div>
                        <div><strong>Location:</strong> {{ session.location }}</div>
                        <div><strong>Tutor:</strong> {{ session.tutor }}</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
              <v-container v-else>
                <p class="text-center text-body-1 pa-4">
                  <template v-if="isTutorUser">
                    You don't have any past sessions yet.
                  </template>
                  <template v-else>
                    No past sessions found
                  </template>
                </p>
              </v-container>
            </v-window-item>
          </v-window>
        </v-card>
      </v-container>
    </v-app>
  </v-responsive>

  <SessionsReschedule
    v-if="selectedSession"
    :session="selectedSession"
    :show="showReschedule"
    @update:show="showReschedule = $event"
    @reschedule="handleReschedule"
  />
</template>

<style scoped>
.sessions-background {
  background: linear-gradient(135deg, #ffd54f 0%, #ffecb3 100%);
  min-height: 100vh;
}

.session-card-container {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.session-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
}

.session-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}
</style>
