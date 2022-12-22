<script lang="ts" setup>
import { useConfigStore } from '~~/store/config'

const { fetchWords, words } = useTypingData()
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
  if (e.key == 'Tab') {
    // Restart
    e.preventDefault()
    startFetch()
  }
}
</script>

<template>
  <div class="home" @keyup="keyup">
    <div v-if="isEnded">
      <TypingResult />
    </div>

    <div v-else>
      <TypingSettings />
      <TypingOptions />
      <Transition name="fade">
        <TypingArea v-if="isWordFetched" :words="words" />
      </Transition>
    </div>
  </div>
</template>
