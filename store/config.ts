import { defineStore } from 'pinia'
import { Config } from '~/types/config'

export const useConfigStore = defineStore('typing', () => {
    const isTyping = ref(false)

    // Default typing config
    const config = reactive<Config>({
        mode: "time",
        punctuation: false,
        numbers: false,
        quote: "medium",
        time: 30,
        words: 60
    })

    const configModes = {
        words: {
            icon: "mdi:clock",
            options: [10, 30, 60, 120]
        },
        quote: {
            icon: "mdi:format-text-variant",
            options: ["all", "short", "medium", "long"]
        },
        time: {
            icon: "mdi:format-quote-open",
            options: [15, 30, 45, 60]
        },
    }

    const options = reactive({
        theme: "bento",
        language: "english"
    })

    
    return {
        isTyping,
        config,
        configModes,
        options
    }
})