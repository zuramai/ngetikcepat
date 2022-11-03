<script lang="ts" setup>
import type { Quotes, Quote } from '~/models/languages/quote';
import { randomItem } from '~/utils/array'

interface Word {
    text: string
    letters: {
        text: string 
        el: HTMLElement|null
    }[]
    el: HTMLElement|null
}
const isMounted = ref(false)

const quotes = ref<Quotes>()
const chosenQuote = ref<Quote>()

const words = reactive<Word[]>([])
const wordsWrapper = ref()
const typingData = reactive({
    currentWord: 0, // word index
    currentLetter: 0, // letter index from the word
    typedWord: [],
    currentlyTyping: ''
})
const currentWord = computed(() => words[typingData.currentWord].text)

const isTypingLastLetter = computed(() => {
    if(typingData.currentLetter == currentWord.value.length) {
        return true
    }
    return false
})

const letterPosition = computed(() => {
    const zero = () => ({ left: 0, top: 0, right: 0, bottom: 0 }) 

    if(!isMounted || 
        !words[typingData.currentWord]) 
        return zero()

    // if(typingData.currentLetter == currentWord.value.length)
    // !words[typingData.currentWord]?.letters[typingData.currentLetter]
    
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
    
    return {
        animation: 'caretFlash .5s ease-in-out infinite alternate',
        ...positionMap
    }
})


const keydown = (e: KeyboardEvent) => {

    if (e.key == ' ') {
        e.preventDefault() // prevent scrolling on space

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
        typingData.currentLetter--
        return
    }

    if(['Shift', 'Control'].includes(e.key)) return
    
    typingData.currentLetter++
    typingData.currentlyTyping += e.key

}


onMounted(() => {
    fetch("/languages/quotes/quote-english.json", { cache: 'force-cache' })
        .then(res => res.json())
        .then(res => {
            quotes.value = res
    
            // Choose one random quote
            chosenQuote.value = randomItem(quotes.value.quotes)

            words.push(...chosenQuote.value.text.split(' ').map(word => {
                return {
                    el: null,
                    text: word,
                    letters: word.split('').map((letter) => {
                        return {
                            el: null,
                            text: letter
                        }
                    })
                }
            }))
            nextTick(() => {
                isMounted.value = true
            })
        })
})
const setRef = (wordIndex, letterIndex, el) => {
    words[wordIndex].letters[letterIndex].el = el
}
</script>
<template>
    <div class="container mx-auto" >
        <div class="typing-area md:w-2/3 mx-auto my-10 select-none p-10  text-6xl " @keydown="keydown" tabindex="0">
            <div class="words flex flex-wrap  h-[230px] overflow-hidden" ref="wordsWrapper">
                <div class="caret" :style="caretStyles"></div>
                <div class="word py-2 mr-4" v-for="(word, wordIndex) in words" :ref="(el) => words[wordIndex].el = (el as HTMLElement)" >
                    <letter v-for="(letter, letterIndex) in word.letters" :ref="(el) => setRef(wordIndex, letterIndex, el)">
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
    transition: all .1s;
}
</style>