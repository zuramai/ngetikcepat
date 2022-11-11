<script lang="ts" setup>
import type { Quotes, Quote } from '~/models/languages/quote';
import { randomItem } from '~/utils/array'
import type { Word } from '~/types/typing';

const theme = useTheme()

const themeUrl = computed(() => `/themes/${theme.currentTheme.value}.css`) 

useHead({
    link: [
        { rel:"stylesheet", type: "text/css", href: themeUrl}
    ]
})

const quotes = ref<Quotes>()
const chosenQuote = ref<Quote>()

const words = reactive<Word[]>([])


onMounted(() => {
    fetch("/quotes/english.json", { cache: 'force-cache' })
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
           
        })
})
</script>
<template>
    <div>
        <TypingSettings></TypingSettings>
        <TypingOptions></TypingOptions>
        <TypingArea :words="words"></TypingArea>
    </div>
</template>
