<script lang="ts" setup>
import type { Word } from '~/types/typing';


const { words } = defineProps<{
    words: Word[]
}>()

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
const isTyping = ref(false)
let timerBeforeStopTyping

const letterPosition = computed(() => {
    const zero = () => ({ left: 0, top: 0, right: 0, bottom: 0 }) 

    if(!isMounted || !words[typingData.currentWord]) 
        return zero()

    let letter = words[typingData.currentWord]?.letters[typingData.currentLetter]
    if(isTypingLastLetter.value) {
        const prevLetter =  words[typingData.currentWord]?.letters[typingData.currentLetter-1].el
        const prevLetterRect = prevLetter.getBoundingClientRect()

        return {
            left: prevLetterRect.left + prevLetterRect.width,
            top: prevLetterRect.top 
        }
    }

    const rect = letter?.el?.getBoundingClientRect()
    if (!rect) return zero()

    return rect
})


const caretStyles = computed(() => {
    console.log(letterPosition.value)
    const positionMap = {
        left: letterPosition.value.left + 'px',
        top: letterPosition.value.top + 10 + 'px',
    }

    let animationName = isTyping.value ? 'none' : 'caretFlash'
    
    return {
        animation: `${animationName} .5s ease-in-out infinite alternate`,
        ...positionMap
    }
})


const keydown = (e: KeyboardEvent) => {

    if ([' ', "'"].includes(e.key)) {
        console.log(e.key)
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
        if(typingData.currentLetter == 0) {
            // Back to prev word
            typingData.currentWord--
            typingData.currentLetter = currentWord.value.length-1
            typingData.currentlyTyping = typingData.typedWord[typingData.currentWord]
            return
        }
        const str = typingData.currentlyTyping
        typingData.currentlyTyping = str.slice(0, str.length-1) + str.slice(str.length, str.length)
        typingData.currentLetter--
        return
    }

    if(['Shift', 'Control'].includes(e.key)) return

    if(isTypingLastLetter && e.key !== ' ') {
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
    let letterIndex = 0

    for(let i = 0; i < wordIndex; i++) {
        letterIndex += words[i].text.length  + 1
    }
    letterIndex += letterWordIndex

    const typedLetter = typingData.currentlyTyping.split(' ').join()
    const isCorrect = typedLetter[letterIndex] == word.text[letterWordIndex]


    let color = "var(--sub-color)"

    // If the user typed wrong letter
    console.log(typedLetter[letterIndex], word.text[letterWordIndex], letterIndex)
    if(typedLetter[letterIndex]) {
        color = isCorrect ? "var(--main-color)" : "var(--error-color)" 
    } 
    
    return {
        color
    }
}
</script>
<template>
    <div class="typing-area w-full md:w-2/3 mx-auto my-10 select-none p-10  text-6xl " @keydown="keydown" tabindex="0">
        <div class="words-wrapper overflow-hidden  h-[230px]">
            <div class="words flex flex-wrap " ref="wordsWrapper">
                <div class="caret" :style="caretStyles"></div>
                <div class="word py-2 mr-4" v-for="(word, wordIndex) in words" :ref="(el) => words[wordIndex].el = (el as HTMLElement)" >
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
.letter {
    display: inline-block;
}
.caret {
    position: absolute;
    height: 1.2em;
    width: .1em;
    border-radius: var(--roundness);
    background-color: var(--caret-color);
    transition: all .2s;
}
</style>