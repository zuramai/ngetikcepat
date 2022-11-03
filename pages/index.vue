<script lang="ts" setup>
import type { Quotes, Quote } from '~/models/languages/quote';
import { randomItem } from '~/utils/array'

interface Word {
    text: string
    el: HTMLElement|null
}

const quotes = ref<Quotes>()
const chosenQuote = ref<Quote>()

const words = reactive<Word[]>([])
const typingData = reactive({
    currentWord: 0, // word index
    currentLetter: 0, // letter index from the word
    typedWord: '',
})
const caretStyles = computed(() => {
    return {
        animation: 'caretFlash .5s ease-in-out infinite alternate',
        left: 0,
        top: 0
    }
})

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
                    text: word 
                }
            }))
        })
})
</script>
<template>
    <div class="container mx-auto">
        <div class="typing-area md:w-2/3 mx-auto my-10 select-none p-10  text-6xl ">
            <div class="words relative flex flex-wrap  h-[230px] overflow-hidden">
                <div class="caret" :style="caretStyles"></div>
               <div class="word mx-2 my-2" v-if="chosenQuote" v-for="(word, i) in words" :ref="(el) => words[i].el = (el as HTMLElement)">
                   <letter v-for="letter in word.text">{{ letter }}</letter>
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
}
</style>