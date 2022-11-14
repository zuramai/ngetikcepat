import { useTypingStore } from "~/store/typing"
import type { Quotes, Quote } from '~/models/languages/quote';
import type { Word } from '~/types/typing';
import { randomItem } from '~/utils/array'

export const useTyping = () => {
    const allWords = ref<Word[]>([])
    const words = ref<Word[]>([])
    const typingStore = useTypingStore()
    const language = computed(() => typingStore.options.language)
    const mode = computed(() => typingStore.config.mode)

    const quotes = ref<Quotes>()
    const chosenQuote = ref<Quote>()

    const transformWord = (word: string) => {
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
    }

    const fetchWords = () => {
        return new Promise<void>((resolve, reject) => {
            const folder = mode.value == "quote" ? 'quotes' : 'languages'
            fetch(`/${folder}/${language.value}.json`, { cache: 'force-cache' })
                .then(res => res.json())
                .then(res => {
                    if(mode.value == 'quote') {
                        quotes.value = res
                        // Choose one random quote
                        chosenQuote.value = randomItem(quotes.value.quotes)
    
                        words.value.push(...chosenQuote.value.text.split(' ').map(word => {
                            return transformWord(word)
                        }))
                        return resolve()
                    } 
    
                    // If the mode is not quotes, then store the random words
                    allWords.value = res.words.map(word => transformWord(word))
    
                    if(mode.value == 'time') {
                        words.value = allWords.value.sort(() => .5 - Math.random())
                        console.log(words.value)
                        return resolve()
                    }
                    
                    const numOfWords = typingStore.config.words
                    words.value = allWords.value.sort(() => .5 - Math.random()).slice(0, numOfWords)
    
                    return resolve()
                })
                .catch((e) => {
                    console.log(e)
                    reject()
                    alert(`Language ${language.value} not found`)
                })
        })
        
    }

    return {
        words, 
        fetchWords,
        quotes,
    }
}