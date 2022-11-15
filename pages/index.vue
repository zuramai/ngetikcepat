<script lang="ts" setup>
import { useConfigStore } from '~~/store/config'


const { fetchWords, words } = useTyping()
const typingStore = useConfigStore()

const isWordFetched = ref(false)
const isEnded = ref(false)

const startFetch = () => {
    isWordFetched.value = false
    fetchWords()
        .then(() => {
            isWordFetched.value = true
        })
}

watch([
    () => typingStore.options.language,
    typingStore.config,
], () => {
    startFetch()
})

onBeforeMount(() => {
    startFetch()
})


const keyup = (e: KeyboardEvent) => {
  if(e.key == 'Tab') {
    // Restart
    e.preventDefault()
    startFetch()
  }
}

</script>
<template>
    <div class="home" @keyup="keyup">
        <div v-if="isEnded">
            <TypingResult></TypingResult>
        </div>
    
        <div v-else>
            <TypingSettings></TypingSettings>
            <TypingOptions></TypingOptions>
            <Transition name="fade">
                <TypingArea :words="words" v-if="isWordFetched"></TypingArea>
            </Transition>
        </div>
    </div>
</template>
