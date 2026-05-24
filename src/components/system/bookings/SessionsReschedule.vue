<script>
export default {
  props: {
    session: {
      type: Object,
      required: true,
    },
    show: Boolean,
  },
  data() {
    return {
      newDate: this.session?.date,
      newTime: this.session?.time,
      availableTimes: [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
      ],
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('update:show', value)
      },
    },
  },
  methods: {
    confirmReschedule() {
      this.$emit('reschedule', {
        ...this.session,
        date: this.newDate,
        time: this.newTime,
      })
    },
    closeDialog() {
      this.$emit('update:show', false)
    },
  },
}
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 bg-amber-lighten-4"> Reschedule Session </v-card-title>

      <v-card-text class="pt-4">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newDate"
                label="New Date"
                type="date"
                :min="new Date().toISOString().split('T')[0]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select v-model="newTime" :items="availableTimes" label="New Time"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="text" @click="closeDialog"> Cancel </v-btn>
        <v-btn color="amber-darken-2" @click="confirmReschedule" :disabled="!newDate || !newTime">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
