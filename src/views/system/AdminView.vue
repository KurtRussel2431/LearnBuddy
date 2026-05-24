<script setup>
import { ref, onMounted } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import AppLayout from '@/components/layout/AppLayout.vue'
import TuteesList from '@/components/system/admin/TuteesList.vue'
import TutorsList from '@/components/system/admin/TutorsList.vue'
import TutorRequests from '@/components/system/admin/TutorRequests.vue'

const authStore = useAuthUserStore()
const tab = ref(0)
const isAdmin = ref(false)

onMounted(async () => {
  // Check if user is admin
  if (authStore.userData?.role?.toLowerCase() === 'admin') {
    isAdmin.value = true
  }
})
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container class="py-6">
        <!-- Header -->
        <v-row class="mb-6">
          <v-col cols="12">
            <h1 class="text-h4 font-weight-bold mb-2">Admin Dashboard</h1>
            <p class="text-body-1 text-grey-darken-1">Manage users and tutor registration requests</p>
          </v-col>
        </v-row>

        <!-- Alert for non-admin users -->
        <v-row v-if="!isAdmin" class="mb-6">
          <v-col cols="12">
            <v-alert
              type="error"
              title="Access Denied"
              text="You do not have permission to access the admin dashboard."
              closable
            ></v-alert>
          </v-col>
        </v-row>

        <!-- Admin Tabs -->
        <v-row v-else>
          <v-col cols="12">
            <v-card elevation="2">
              <v-tabs v-model="tab" bg-color="primary" class="text-white">
                <v-tab value="tutees">
                  <v-icon start>mdi-account-multiple</v-icon>
                  Tutees
                </v-tab>
                <v-tab value="tutors">
                  <v-icon start>mdi-school</v-icon>
                  Tutors
                </v-tab>
                <v-tab value="requests">
                  <v-icon start>mdi-clipboard-check</v-icon>
                  Tutor Requests
                </v-tab>
              </v-tabs>

              <v-window v-model="tab">
                <!-- Tutees Tab -->
                <v-window-item value="tutees">
                  <v-card-text class="pa-6">
                    <TuteesList />
                  </v-card-text>
                </v-window-item>

                <!-- Tutors Tab -->
                <v-window-item value="tutors">
                  <v-card-text class="pa-6">
                    <TutorsList />
                  </v-card-text>
                </v-window-item>

                <!-- Tutor Requests Tab -->
                <v-window-item value="requests">
                  <v-card-text class="pa-6">
                    <TutorRequests />
                  </v-card-text>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped></style>
