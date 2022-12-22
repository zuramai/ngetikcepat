<script lang="ts" setup>
import TextButton from '~/components/ui/TextButton.vue'
import { useTheme } from '~/composables/useTheme'
import { useConfigStore } from '~~/store/config'
import type { Languages } from '~/types/language'

const { nextTheme, changeTheme, currentTheme } = useTheme()
const typingStore = useConfigStore()

const currentLanguage = computed(() => typingStore.options.language)

const languageList = ref<Languages>([])

fetch('/languages/_list.json')
  .then(res => res.json())
  .then((res) => {
    languageList.value = res
  })

const changelanguage = (language: string) => {
  console.log('language changed to ', language)
  typingStore.options.language = language
}

const nextLanguage = () => {
  const index = languageList.value.findIndex(language => language.name === currentLanguage.value)
  const nextIndex = index + 1 >= languageList.value.length ? 0 : index + 1
  changelanguage(languageList.value[nextIndex].name)
}
</script>

<template>
  <div class="options-area-wrapper flex justify-center mt-5">
    <div class="options-area">
      <div class="options-bg  rounded-full" />
      <ul class="mx-auto m-0 list-none flex gap-1 pr-2 pl-0">
        <li class="flex items-center ">
          <a class="bg-gray-100/4 hover:bg-gray-100/10 rounded-full px-4 block h-full" href="#">
            <div class="i-mdi:cog mt-3" />
          </a>
        </li>
        <li>
          <TextButton title="language" @click="nextLanguage">
            <template #icon>
              <div class="i-mdi:earth" />
            </template>
            {{ currentLanguage }}
          </TextButton>
        </li>
        <li>
          <TextButton title="theme" @click="nextTheme">
            <template #icon>
              <div class="i-mdi:palette" />
            </template>
            {{ currentTheme }}
          </TextButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.options-area {
    position: relative;
}
.options-bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: var(--sub-color);
    opacity: .2;
    width: 100%;
    height: 100%;
}
</style>
