import { defineStore } from 'pinia'
import type { Config } from '~/types/config'

export const useConfigStore = defineStore('typing', () => {
  const isTyping = ref(false)

  // Default typing config
  const config = reactive < Config > ({
    mode: 'time',
    punctuation: false,
    numbers: false,
    quote: 'medium',
    time: 30,
    words: 60,
  })

  const configModes = {
    words: {
      options: [10, 30, 60, 120],
      icon: 'i-mdi:format-text-variant',
    },
    quote: {
      icon: 'i-mdi:format-quote-close',
      options: ['all', 'short', 'medium', 'long'],
    },
    time: {
      icon: 'i-mdi:clock',
      options: [15, 30, 45, 60],
    },
  }

  // Default options
  const options = reactive({
    theme: 'comfy',
    language: 'english',
  })

  return {
    isTyping,
    config,
    configModes,
    options,
  }
})
