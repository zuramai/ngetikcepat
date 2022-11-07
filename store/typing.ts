import { defineStore } from 'pinia'

export const useTypingStore = defineStore('typing', () => {
    const isTyping = ref(false)
    const mode = ref("time")
    
    return {
        isTyping,
        mode
    }
})