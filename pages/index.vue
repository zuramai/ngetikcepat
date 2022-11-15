<script lang="ts" setup>
import { useConfigStore } from '~~/store/config'


const { fetchWords, words } = useTyping()
const typingStore = useConfigStore()

const isWordFetched = ref(false)
const isEnded = ref(true)

watch([
    () => typingStore.options.language,
    typingStore.config,
], () => {
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
    <div v-if="isEnded">
        <TypingResult></TypingResult>
    </div>

    <div v-else>
        <TypingSettings></TypingSettings>
        <TypingOptions></TypingOptions>
        <Transition name="fade">
            <TypingArea :words="words" v-if="isWordFetched "></TypingArea>
        </Transition>
    </div>
</template>
