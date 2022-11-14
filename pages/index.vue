<script lang="ts" setup>
import { useTypingStore } from '~/store/typing'
const theme = useTheme()

const themeUrl = computed(() => `/themes/${theme.currentTheme.value}.css`) 

useHead({
    link: [
        { rel:"stylesheet", type: "text/css", href: themeUrl}
    ]
})

const { fetchWords, words } = useTyping()
const typingStore = useTypingStore()

const isWordFetched = ref(false)

watch(() => typingStore.options.language, () => {
    isWordFetched.value = false

    fetchWords()
        .then(() => {
            isWordFetched.value = true
        })
})

onBeforeMount(() => {
    fetchWords()
        .then(() => {
            isWordFetched.value = true
        })
})
</script>
<template>
    <div>
        <TypingSettings></TypingSettings>
        <TypingOptions></TypingOptions>
        <TypingArea :words="words" v-if="isWordFetched"></TypingArea>
    </div>
</template>
