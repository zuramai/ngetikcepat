import { defineStore } from 'pinia'

export const useTypingStore = defineStore('typing', {
    state: () => ({
        isTyping: false
    })
})