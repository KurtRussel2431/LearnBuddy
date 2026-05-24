<script setup>
import { defineProps } from 'vue'

// Define props
const props = defineProps({
  selectedSubject: String,
  selectedDate: String,
  selectedTime: String,
  selectedLocation: String,
})

// Define emits

// Method to confirm the booking
</script>

<template>
  <h3>Confirm Your Booking</h3>
  <p>
    <strong>Subject:</strong> {{ props.selectedSubject }} <br />
    <strong>Date:</strong> {{ props.selectedDate }} <br />
    <strong>Time:</strong> {{ props.selectedTime }} <br />
    <strong>Location:</strong> {{ props.selectedLocation }}
  </p>

  <v-spacer class="my-5"></v-spacer>
</template>
