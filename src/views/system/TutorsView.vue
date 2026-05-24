<script setup>
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['update:selected-tutor'])
const props = defineProps({
  tutors: {
    type: Array,
    default: () => [],
  },
  selectedTutor: {
    type: Object,
    default: null,
  },
})

const selectTutor = (tutor) => {
  emit('update:selected-tutor', tutor)
}
</script>

<template>
  <v-container fluid class="tutor-hero-section">
    <h2 class="text-h4 font-weight-bold text-center mb-6">Book a Session with these Tutors!</h2>

    <div class="scroll-container">
      <div v-for="tutor in props.tutors" :key="tutor.id" class="tutor-card-wrapper">
        <v-card
          class="tutor-card"
          :class="{ 'tutor-card-selected': tutor.id === props.selectedTutor?.id }"
          elevation="4"
          @click="selectTutor(tutor)"
        >
          <v-img :src="tutor.image" height="180" cover class="card-image"></v-img>
          <v-card-title class="name">{{ tutor.name }}</v-card-title>
          <v-card-subtitle class="subtitle"> {{ tutor.field }} • {{ tutor.year }} </v-card-subtitle>
          <v-card-text class="details">
            <v-rating
              :model-value="tutor.rating"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            />
            <div class="chips mt-2">
              <v-chip
                v-for="subject in tutor.subjects"
                :key="subject"
                class="subject-chip"
                size="small"
                color="teal-darken-2"
                text-color="white"
              >
                {{ subject }}
              </v-chip>
            </div>
          </v-card-text>
          <v-card-actions>
            <RouterLink to="/bookings">
              <v-btn
                class="book-btn"
                @click="selectTutor(tutor)"
                color="deep-orange-accent-3"
                variant="flat"
                rounded="xl"
              >
                Book Now
              </v-btn>
            </RouterLink>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.tutor-hero-section {
  background: linear-gradient(135deg, #fff3e0, #ffe0b2); /* warm creamy orange */
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  min-height: 100vh;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
}

.tutor-card-wrapper {
  flex: 0 0 auto;
  scroll-snap-align: start;
}

.tutor-card {
  width: 260px;
  border-radius: 20px;
  background-color: #ffffff;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  border: 2px solid transparent;
}

.tutor-card-selected {
  border-color: #ffb300;
  box-shadow: 0 16px 28px rgba(255, 181, 0, 0.25);
  transform: translateY(-4px);
}

.tutor-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}
.tutor-card:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.tutor-card:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(255, 213, 79, 0.5);
}
.tutor-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(255, 213, 79, 0.5);
}
.tutor-card:focus-within {
  outline: none;
  box-shadow: 0 0 0 4px rgba(255, 213, 79, 0.5);
}
.card-image {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.name {
  font-weight: 600;
  color: #333;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
}

.details {
  font-size: 0.85rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.subject-chip {
  font-weight: 500;
  background-color: #00695c !important; /* strong teal */
  color: #fff !important;
}

.book-btn {
  font-weight: 600;
  transition: transform 0.2s ease;
}

.book-btn:hover {
  transform: scale(1.03);
}
</style>
