<script lang="ts" setup>
import type { Quotes, Quote } from '~/models/languages/quote';
import { randomItem } from '~/utils/array'

const quotes = ref<Quotes>()
const chosenQuote = ref<Quote>()
const quotePerWord = computed(() => {
    return chosenQuote.value.text.split(' ')
})

fetch("/languages/quotes/quote-english.json", { cache: 'force-cache' })
    .then(res => res.json())
    .then(res => {
        quotes.value = res

        // Choose one random quote
        chosenQuote.value = randomItem(quotes.value.quotes)
    })
</script>
<template>
    <div class="container mx-auto">
        <div class="typing-area md:w-2/3 mx-auto my-10 select-none p-10">
            <div class="words flex flex-wrap  h-[230px] overflow-hidden">
               <div class="word text-6xl mx-2 my-2" v-if="chosenQuote" v-for="word in quotePerWord">
                   <letter v-for="letter in word">{{ letter }}</letter>
               </div>
           </div>
        </div>
    </div>
</template>

<style>
.letter {
    display: inline-block;
}
</style>