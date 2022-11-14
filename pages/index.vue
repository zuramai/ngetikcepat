<script lang="ts" setup>
const theme = useTheme()

const themeUrl = computed(() => `/themes/${theme.currentTheme.value}.css`) 

useHead({
    link: [
        { rel:"stylesheet", type: "text/css", href: themeUrl}
    ]
})

const { fetchWords, words } = useTyping()


onMounted(() => {
    fetchWords()
})
</script>
<template>
    <div>
        <TypingSettings></TypingSettings>
        <TypingOptions></TypingOptions>
        <TypingArea :words="words"></TypingArea>
    </div>
</template>
