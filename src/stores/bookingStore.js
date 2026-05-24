import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    currentStep: 1,
    selectedTutor: null,
    selectedSubject: null,
    selectedDate: null,
    selectedTime: null,
    selectedLocation: null,
    sessions: JSON.parse(localStorage.getItem('sessions') || '[]'),
  }),

  actions: {
    resetForm() {
      this.selectedTutor = null
      this.selectedSubject = null
      this.selectedDate = null
      this.selectedTime = null
      this.selectedLocation = null
      this.currentStep = 1
    },
    bookSession() {
      if (this.selectedDate && this.selectedTime && this.selectedLocation && this.selectedTutor) {
        const newSession = {
          id: Date.now(),
          subject: this.selectedSubject,
          date: this.selectedDate,
          time: this.selectedTime,
          location: this.selectedLocation,
          tutor: this.selectedTutor.name,
          tutorId: this.selectedTutor.id ?? null,
          tutorEmail: this.selectedTutor.email ?? null,
        }
        this.sessions.push(newSession)
        localStorage.setItem('sessions', JSON.stringify(this.sessions))
        return newSession
      }
      return null
    },
    goToNextStep() {
      if (this.currentStep < 4) this.currentStep++
    },
    goToPrevStep() {
      if (this.currentStep > 1) this.currentStep--
    },
  },
})
