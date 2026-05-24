<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import TutorsView from './TutorsView.vue'
import SubjectSelector from '@/components/system/bookings/SubjectSelector.vue'
import SelectDateTime from '@/components/system/bookings/DateSelector.vue'
import BookingConfirmation from '@/components/system/bookings/BookingConfirmation.vue'
import { tutors } from '@/stores/tutors.js'
import { useBookingStore } from '@/stores/bookingStore.js'

const booking = useBookingStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const availableTimes = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
]

onMounted(() => {
  const tutorId = route.query.tutorId
  if (tutorId) {
    const matchedTutor = tutors.find((t) => t.id === Number(tutorId))
    if (matchedTutor) {
      booking.selectedTutor = matchedTutor
      booking.currentStep = 2
    }
  }
})

function updateDate({ date, location }) {
  booking.selectedDate = date
  booking.selectedLocation = location
}

function updateSubject(subject) {
  booking.selectedSubject = subject
}

function updateTime(time) {
  booking.selectedTime = time
}

function confirmBooking() {
  const session = booking.bookSession()
  if (session) {
    toast.success(`Session booked on ${session.date} at ${session.time}, ${session.location}`)
    booking.resetForm()
    router.push('/dashboard')
  } else {
    toast.error('Please complete all fields.')
  }
}
</script>

<template>
  <v-app>
    <v-container class="booking-container">
      <v-card class="booking-card mx-auto">
        <v-card-title class="text-center title">
          📚 Book a Tutoring Session
          <div class="subtitle">Start by selecting a tutor</div>
        </v-card-title>

        <v-window v-model="booking.currentStep" class="mt-4">
          <!-- Step 1: Select Tutor -->
          <v-window-item :value="1">
            <TutorsView
              :tutors="tutors"
              :selected-tutor="booking.selectedTutor"
              @update:selected-tutor="booking.selectedTutor = $event"
            />
          </v-window-item>

          <!-- Step 2: Subject Selection -->
          <v-window-item :value="2">
            <SubjectSelector
              :selectedSubject="booking.selectedSubject"
              :subjects="booking.selectedTutor?.subjects || []"
              @update-subject="updateSubject"
            />
          </v-window-item>

          <!-- Step 3: Date + Time -->
          <v-window-item :value="3">
            <SelectDateTime :selectedDate="booking.selectedDate" @update-date="updateDate" />
            <v-divider class="my-4" />
            <h4 class="font-weight-bold mb-2">Available Times</h4>
            <v-row>
              <v-col v-for="time in availableTimes" :key="time" cols="12" sm="6" md="3">
                <v-btn
                  block
                  :color="booking.selectedTime === time ? 'primary' : 'grey-lighten-2'"
                  :variant="booking.selectedTime === time ? 'elevated' : 'outlined'"
                  @click="updateTime(time)"
                >
                  {{ time }}
                </v-btn>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Step 4: Confirmation -->
          <v-window-item :value="4">
            <BookingConfirmation
              :selectedSubject="booking.selectedSubject"
              :selectedDate="booking.selectedDate"
              :selectedTime="booking.selectedTime"
              :selectedLocation="booking.selectedLocation"
              :selectedTutor="booking.selectedTutor"
              @confirm-booking="confirmBooking"
            />
          </v-window-item>
        </v-window>

        <v-divider class="my-4" />

        <v-card-actions class="d-flex justify-space-between">
          <v-btn
            variant="text"
            color="grey"
            @click="booking.goToPrevStep"
            :disabled="booking.currentStep === 1"
          >
            <v-icon left>mdi-arrow-left</v-icon> Back
          </v-btn>
          <v-btn variant="text" color="red" @click="booking.resetForm">
            <v-icon left>mdi-refresh</v-icon> Reset
          </v-btn>
          <v-btn
            color="green"
            @click="booking.currentStep === 4 ? confirmBooking() : booking.goToNextStep()"
            :disabled="
              (booking.currentStep === 1 && !booking.selectedTutor) ||
              (booking.currentStep === 2 && !booking.selectedSubject) ||
              (booking.currentStep === 3 && (!booking.selectedDate || !booking.selectedTime))
            "
          >
            {{ booking.currentStep === 4 ? 'Confirm Booking' : 'Continue' }}
            <v-icon right>
              {{ booking.currentStep === 4 ? 'mdi-check' : 'mdi-arrow-right' }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
.booking-container {
  background: linear-gradient(135deg, #fff9c4, #ffe082);
  min-height: 100vh;
  padding: 2rem;
}
.booking-card {
  max-width: 900px;
  border-radius: 16px;
  padding: 2rem;
  background-color: #fffdf4;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #3e2723;
}
.subtitle {
  font-size: 1rem;
  color: #757575;
  margin-top: 0.5rem;
}
</style>
