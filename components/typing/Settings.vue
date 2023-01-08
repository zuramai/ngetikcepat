<script lang="ts" setup>
import TextButton from '../ui/TextButton.vue'
import ListSlider from '../ui/ListSlider.vue'
import { useConfigStore } from '~~/store/config'
import type { Languages } from '~~/types/language'
const typingStore = useConfigStore()
const { config, configModes } = useConfigStore()
const availableIcons = [
  'i-mdi:world', 'i-mdi:palette', 'i-mdi:clock', 'i-mdi:format-text-variant', 'i-mdi:format-quote-close',
]

const { nextTheme, changeTheme, currentTheme } = useTheme()
const languageList = ref<Languages>([])
const currentLanguage = computed(() => typingStore.options.language)

onMounted(() => {
  const config = useAppConfig()
  console.log('config', config.baseUrl)
  $fetch(`${config.baseUrl}/languages/_list.json`)
    .then((res) => {
      languageList.value = res as Languages
    })
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
  <div class="typing-settings flex justify-center">
    <div class="settings-card flex-grow-0 rounded-sm shadow-lg my-5 text-sm p-1">
      <h4 class="px-3 text-xl font-bold my-2">
        Typing Options
      </h4>
      <div class="modes">
        <ul class="settings-list p-0 m-0 flex">
          <li>
            <TextButton icon="i-mdi:world" :active="config.punctuation" @click="nextLanguage">
              {{ currentLanguage }}
            </TextButton>
          </li>
          <li>
            <TextButton icon="i-mdi:palette" :active="config.numbers" @click="nextTheme">
              {{ currentTheme }}
            </TextButton>
          </li>
          <li class="separator" />
          <li v-for="(v, mode) in configModes" :key="mode">
            <TextButton :icon="v.icon" :active="config.mode === mode" @click="config.mode = mode">
              {{ mode }}
            </TextButton>
          </li>
          <li class="separator" />
          <li v-for="modeOption in configModes[config.mode].options" :key="modeOption">
            <TextButton :icon="false" :active="config[config.mode] === modeOption" @click="(config[config.mode] as any) = modeOption">
              {{ modeOption }}
            </TextButton>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.settings-card {
    background-color: var(--sub-alt-color);
}
.settings-list {
    list-style: none;
}
.separator {
    width: 2px;
    margin: .6rem 0;
    height: auto;
    background-color: var(--sub-color);
}
</style>
