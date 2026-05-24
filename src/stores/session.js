// stores/session.js
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessions: JSON.parse(localStorage.getItem('sessions') || '[]'),
  }),

  actions: {
    addSession(session) {
      this.sessions.push(session)
      localStorage.setItem('sessions', JSON.stringify(this.sessions))
    },

    clearSessions() {
      this.sessions = []
      localStorage.removeItem('sessions')
    },
  },
})
