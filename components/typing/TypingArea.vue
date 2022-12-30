<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { Ref } from 'vue'
import type { Word } from '~/types/typing'
import { useConfigStore } from '~~/store/config'

const props = defineProps<{
  words: Word[]
}>()
const words = computed(() => props.words)

const wordsGroup = ref<HTMLElement>()
const wordsWrapper = ref<HTMLElement>()
const isMounted = ref(false)

const { typing: typingData, currentWord, isTypingLastLetter } = useTyping(words)

// For caret animation
const typingStore = useConfigStore()
const { isTyping } = storeToRefs(typingStore)
let timerBeforeStopTyping: NodeJS.Timeout

// Get current letter position
const letterPosition = computed(() => {
  const zero = () => ({ left: 0, top: 0, right: 0, bottom: 0 })

  if (!isMounted || !words.value[typingData.currentWordIndex])
    return zero()

  const letter = words.value[typingData.currentWordIndex]?.letters[typingData.currentLetter]

  if (isTypingLastLetter.value) {
    const prevLetter = words.value[typingData.currentWordIndex]!.letters[typingData.currentLetter - 1].el!
    const prevLetterRect = { left: prevLetter.offsetLeft, top: prevLetter.offsetTop, width: prevLetter.offsetWidth }

    return {
      left: prevLetterRect.left + wordsGroup.value!.offsetLeft + prevLetterRect.width,
      top: prevLetter.offsetTop * -1,
    }
  }

  const rect = letter?.el?.getBoundingClientRect()
  if (!rect)
    return zero()

  return {
    left: letter.el!.offsetLeft - (wordsGroup.value?.offsetLeft ?? 0),
    top: letter.el!.offsetTop * -1,
  }
})

// Caret styles (position and animation)
const caretStyles = computed(() => {
  const positionMap = {
    left: `${letterPosition.value.left - 2}px`,
    top: `${-letterPosition.value.top + 5}px`,
  }

  const animationName = isTyping.value ? 'none' : 'caretFlash'

  return {
    animation: `${animationName} .5s ease-in-out infinite alternate`,
    ...positionMap,
  }
})

const wordsGroupStyle = computed(() => {
  return {
    top: `${letterPosition.value.top}px`,
  }
})

const keydown = (e: KeyboardEvent) => {
  if ([' ', '\'', 'Tab', 'Alt'].includes(e.key)) {
    e.preventDefault()

    if (['Alt'].includes(e.key))
      return
  }

  if (e.ctrlKey)
    return

  if (e.key === ' ') {
    // move to the next word
    typingData.currentLetter = 0
    typingData.currentWordIndex++
    typingData.currentlyTyping += e.key
    return
  }

  if (e.key === 'Backspace') {
    const str = typingData.currentlyTyping
    if (typingData.currentLetter === 0) {
      // Back to prev word
      typingData.currentWordIndex--
      typingData.currentLetter = currentWord.value.length
    }
    else {
      typingData.currentLetter--
    }
    typingData.currentlyTyping = str.slice(0, -1)
    return
  }

  const prohibitedKeys = ['Shift', 'Control', 'Tab']

  if (prohibitedKeys.includes(e.key))
    return

  if (isTypingLastLetter.value && e.key !== ' ')
    return

  if (!isTypingLastLetter.value) {
    typingData.currentLetter++
    typingData.currentlyTyping += e.key

    isTyping.value = true
    clearTimeout(timerBeforeStopTyping)
    timerBeforeStopTyping = setTimeout(() => {
      isTyping.value = false
    }, 2000)
  }
}

const getLetterStyle = (wordIndex: number, letterWordIndex: number) => {
  const word = words.value[wordIndex]
  if (wordIndex > typingData.currentWordIndex)
    return

  const typedLetters = typingData.currentlyTyping.split(' ')
  let color = 'var(--sub-color)'
  let isCorrect = false

  if (typedLetters[wordIndex] && typedLetters[wordIndex][letterWordIndex]) {
    isCorrect = typedLetters[wordIndex][letterWordIndex] === word.text[letterWordIndex]
    color = isCorrect ? 'var(--main-color)' : 'var(--error-color)'
  }

  return {
    color,
  }
}

// const app = inject<Ref<HTMLElement>>('app')
onMounted(() => {
  isMounted.value = true

  document.body.addEventListener('keydown', keydown)

  onBeforeUnmount(() => {
    document.body.removeEventListener('keydown', keydown)
  })
})
</script>

<template>
  <div class="typing-area w-full md:w-2/3 my-3 select-none py-10  text-6xl " tabindex="0">
    <div ref="wordsWrapper" class="words-wrapper overflow-hidden  relative h-[225px]">
      <div ref="wordsGroup" class="words flex flex-wrap  absolute text-5xl" :style="wordsGroupStyle">
        <div class="caret" :style="caretStyles" />
        <div v-for="(word, wordIndex) in words" :key="wordIndex" :ref="(el) => words[wordIndex].el = (el as HTMLElement)" class="word ">
          <letter
            v-for="(letter, letterIndex) in word.letters"
            :key="letterIndex"
            :ref="(el: HTMLElement) => words[wordIndex].letters[letterIndex].el = el"
            :style="getLetterStyle(wordIndex, letterIndex)"
          >
            {{ letter.text }}
          </letter>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.word {
    margin: .25em;
}
.letter {
    display: inline-block;
}
.caret {
    position: absolute;
    height: 1.2em;
    width: .1em;
    border-radius: var(--roundness);
    background-color: var(--caret-color);
    transition: all .1s;
}
</style>
