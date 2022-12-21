<script lang="ts" setup>
import type { Word } from '~/types/typing';
import { useConfigStore } from '~~/store/config'
import { storeToRefs } from 'pinia'
import { Ref } from 'vue';

const { words } = defineProps<{
    words: Word[]
}>()


const wordsGroup = ref<HTMLElement>()
const wordsWrapper = ref<HTMLElement>()

const typingData = reactive({
    currentWord: 0, // word index
    currentLetter: 0, // letter index from the word
    typedWord: [],
    currentlyTyping: ''
})
const currentWord = computed(() => words[typingData.currentWord].text)

const isTypingLastLetter = computed(() => {
    if(typingData.currentLetter >= currentWord.value.length) {
        return true
    }
    return false
})

const isMounted = ref(false)


// For caret animation
const typingStore = useConfigStore()
const { isTyping } = storeToRefs(typingStore)
let timerBeforeStopTyping: NodeJS.Timeout

// Get current letter position
const letterPosition = computed(() => {
    const zero = () => ({ left: 0, top: 0, right: 0, bottom: 0 }) 

    if(!isMounted || !words[typingData.currentWord]) 
        return zero()

    let letter = words[typingData.currentWord]?.letters[typingData.currentLetter]

    if(isTypingLastLetter.value) {
        const prevLetter =  words[typingData.currentWord]?.letters[typingData.currentLetter-1].el
        const prevLetterRect = {left: prevLetter.offsetLeft, top: prevLetter.offsetTop, width: prevLetter.offsetWidth}

        return {
            left: prevLetterRect.left + prevLetter.parentElement.parentElement.offsetLeft + prevLetterRect.width,
            top: prevLetter.offsetTop * -1
        }
    }

    const rect = letter?.el?.getBoundingClientRect()
    if (!rect) return zero()

    return {
        left: letter.el.offsetLeft - letter.el.parentElement.parentElement.offsetLeft,
        top: letter.el.offsetTop * -1
    }
})

// Caret styles (position and animation)
const caretStyles = computed(() => {
    const positionMap = {
        left: letterPosition.value.left - 2 + 'px',
        top: -letterPosition.value.top + 5 + 'px',
    }

    let animationName = isTyping.value ? 'none' : 'caretFlash'
    
    return {
        animation: `${animationName} .5s ease-in-out infinite alternate`,
        ...positionMap
    }
})

const wordsGroupStyle = computed(() => {
    return {
        top: (letterPosition.value.top ) + 'px'
    }
})

const keydown = (e: KeyboardEvent) => {
    if ([' ', "'", 'Tab'].includes(e.key)) {
        e.preventDefault() 
    }

    if (e.key == ' ') {
        // move to the next word
        typingData.currentLetter = 0
        typingData.currentWord++
        typingData.currentlyTyping += e.key
        return
    }
    
    if (e.key == 'Backspace') {
        const str = typingData.currentlyTyping
        if(typingData.currentLetter == 0) {
            // Back to prev word
            typingData.currentWord--
            typingData.currentLetter = currentWord.value.length
        } else {
            typingData.currentLetter--
        }
        typingData.currentlyTyping = str.slice(0, -1)
        return
    }

    const prohibitedKeys = ['Shift', 'Control', 'Tab']

    if(prohibitedKeys.includes(e.key)) return

    if(isTypingLastLetter.value && e.key !== ' ') {
        return
    }

    if(!isTypingLastLetter.value) {
        typingData.currentLetter++
        typingData.currentlyTyping += e.key

        isTyping.value = true
        clearTimeout(timerBeforeStopTyping)
        timerBeforeStopTyping = setTimeout(() => {
            isTyping.value = false 
        }, 2000)
    }
}


const getLetterStyle = (wordIndex, letterWordIndex) => {
    const word = words[wordIndex]
    if(wordIndex > typingData.currentWord) return

    const typedLetters = typingData.currentlyTyping.split(' ')
    let color = "var(--sub-color)"
    let isCorrect = false

    if(typedLetters[wordIndex] && typedLetters[wordIndex][letterWordIndex]) {
        isCorrect = typedLetters[wordIndex][letterWordIndex] == word.text[letterWordIndex]
        color = isCorrect ? "var(--main-color)" : "var(--error-color)" 
    } 
    
    return {
        color
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
    <div class="typing-area w-full md:w-2/3 mx-auto my-3 select-none p-10  text-6xl " tabindex="0">
        <div class="words-wrapper overflow-hidden  relative h-[230px]" ref="wordsWrapper">
            <div class="words flex flex-wrap  absolute text-5xl" ref="wordsGroup" :style="wordsGroupStyle">
                <div class="caret" :style="caretStyles"></div>
                <div class="word " v-for="(word, wordIndex) in words" :ref="(el) => words[wordIndex].el = (el as HTMLElement)" >
                    <letter v-for="(letter, letterIndex) in word.letters" 
                            :ref="(el) => words[wordIndex].letters[letterIndex].el = el"
                            :style="getLetterStyle(wordIndex, letterIndex)">
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