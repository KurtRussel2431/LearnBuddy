<script setup>
import { ref, defineProps, defineEmits } from 'vue'

// Define the props
const emit = defineEmits(['update-date']) // or whatever your events are
const props = defineProps({
  selectedDate: String,
})
// Local state for available dates
const locationOptions = [
  'Hiraiya Room 101',
  'Hiraiya CL 5',
  'CSU-Library Study Room',
  'Hiraiya Room 102',
  'CSU-Library Study Room',
]

const formatDisplayDate = (date) =>
  date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

const createAvailableDates = () => {
  const dates = []
  const today = new Date()

  for (let i = 1; i <= 5; i += 1) {
    const nextDate = new Date(today)
    nextDate.setDate(today.getDate() + i)

    dates.push({
      id: i,
      date: formatDisplayDate(nextDate),
      isAvailable: true,
      location: locationOptions[(i - 1) % locationOptions.length],
    })
  }

  return dates
}

const availableDates = ref(createAvailableDates())

// Method to handle date selection
const selectDate = (date) => {
  if (date.isAvailable) {
    emit('update-date', date)
  }
}
</script>

<template>
  <h3 class="text-h5 mb-4 font-weight-bold" style="color: #2c3e50">Select an Available Date</h3>
  <v-row>
    <v-col v-for="date in availableDates" :key="date.id" cols="12" md="6" lg="4">
      <v-card
        elevation="4"
        :class="['date-card', { 'date-card-selected': date.date === props.selectedDate }]"
        @click="selectDate(date)"
      >
        <v-card-title class="d-flex align-center">
          <v-icon size="24" class="mr-2">mdi-calendar</v-icon>
          <span class="date-text">{{ date.date }}</span>
        </v-card-title>
        <v-card-subtitle class="py-2">
          <div class="d-flex align-center">
            <v-icon size="20" class="mr-2">mdi-map-marker</v-icon>
            <span class="location-text">{{ date.location }}</span>
          </div>
        </v-card-subtitle>
        <v-card-text>
          <v-chip
            :color="date.isAvailable ? 'success' : 'grey'"
            :text-color="date.isAvailable ? 'white' : ''"
            size="small"
          >
            {{ date.isAvailable ? 'Available' : 'Not Available' }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.date-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: white !important;
}

.date-card:hover {
  transform: translateY(-4px);
  border-color: #ffd54f;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1) !important;
}

.date-card-selected {
  border-color: #ffa000;
  background: #fff8e1 !important;
}

.date-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.location-text {
  color: #546e7a;
  font-weight: 500;
}

.v-card-title {
  background-color: #f5f5f5;
}

.v-card-subtitle {
  padding-top: 12px !important;
}
</style>
