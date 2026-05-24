<script>
import { useToast } from 'vue-toastification'
import { computed } from 'vue'

export default {
  props: {
    show: Boolean,
    sessionId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialogVisible = computed({
      get: () => props.show,
      set: (value) => emit('update:show', value),
    })

    return {
      dialogVisible,
    }
  },
  methods: {
    confirmCancel() {
      const toast = useToast()
      // Emit the cancel event with the session ID
      this.$emit('cancel', this.sessionId)
      toast.success('Session cancelled successfully!')
    },
    closeDialog() {
      this.$emit('update:show', false)
    },
  },
}
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="400px" persistent>
    <v-card class="cancel-dialog">
      <v-card-title class="text-h5 bg-error-lighten-5 py-3">
        <v-icon color="error" class="mr-2">mdi-alert-circle</v-icon>
        Cancel Session
      </v-card-title>

      <v-card-text class="pt-4">
        <p class="text-body-1">Are you sure you want to cancel this session?</p>
        <p class="text-caption mt-2 text-grey">This action cannot be undone.</p>
      </v-card-text>

      <v-card-actions class="pb-4 px-4">
        <v-spacer></v-spacer>
        <v-btn
          color="grey-darken-1"
          variant="text"
          @click="closeDialog"
          class="mr-2"
          min-width="90"
        >
          No, Keep
        </v-btn>
        <v-btn color="error" variant="elevated" @click="confirmCancel" min-width="90">
          Yes, Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.cancel-dialog {
  border-radius: 8px;
  overflow: hidden;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}
</style>
