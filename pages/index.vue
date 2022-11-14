<script lang="ts" setup>
const theme = useTheme()

const themeUrl = computed(() => `/themes/${theme.currentTheme.value}.css`) 

useHead({
    link: [
        { rel:"stylesheet", type: "text/css", href: themeUrl}
    ]
})

const { fetchWords, words } = useTyping()

const isWordFetched = ref(false)

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
