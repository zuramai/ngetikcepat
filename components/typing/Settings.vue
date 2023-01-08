<script lang="ts" setup>
import TextButton from '../ui/TextButton.vue'
import ListSlider from '../ui/ListSlider.vue'
import { useConfigStore } from '~~/store/config'
import type { Languages } from '~~/types/language'
const typingStore = useConfigStore()
const { config, configModes } = useConfigStore()
const availableIcons = [
  'i-mdi:at', 'i-mdi:numeric', 'i-mdi:clock', 'i-mdi:format-text-variant', 'i-mdi:format-quote-close',
]

const languageList = ref<Languages>([])
const currentLanguage = computed(() => typingStore.options.language)

onMounted(() => {
  $fetch('/languages/_list.json')
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
  <div class="typing-settings flex">
    <div class="settings-card flex-grow-0 rounded-lg my-5 text-sm">
      <h4 class="px-3 text-xl font-bold my-2">
        Typing Options
      </h4>
      <div class="modes">
        <ul class="settings-list p-0 m-0 flex">
          <li>
            <TextButton icon="i-mdi:at" :active="config.punctuation" @click="config.punctuation = !config.punctuation">
              punctuation
            </TextButton>
          </li>
          <li>
            <TextButton icon="i-mdi:numeric" :active="config.numbers" @click="config.numbers = !config.numbers">
              numbers
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
      <div class="language text-normal px-3 flex items-center  mb-5">
        <h4 class="mr-5 my-0">
          Language:
        </h4>
        <ui-list-slider :labels="languageList.map(a => a.name)" />
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
