import type { ComputedRef } from 'vue'
import type { Word } from '~/types/typing'

export default function (words: ComputedRef<Word[]>) {
  const typing = reactive({
    currentWordIndex: 0, // word index
    currentLetter: 0, // letter index from the word
    typedWord: [],
    currentlyTyping: '',
  })

  const currentWord = computed(() => words.value[typing.currentWordIndex].text)

  const isTypingLastLetter = computed(() => {
    if (typing.currentLetter >= currentWord.value.length)
      return true

    return false
  })

  return {
    typing,
    isTypingLastLetter,
    currentWord,
  }
}
