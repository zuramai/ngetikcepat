<script lang="ts" setup>
import TextButton from '../ui/TextButton.vue'
import { useConfigStore } from '~~/store/config'
const { config, configModes } = useConfigStore()
const availableIcons = [
  'i-mdi:at', 'i-mdi:numeric', 'i-mdi:clock', 'i-mdi:format-text-variant', 'i-mdi:format-quote-open',
]
</script>

<template>
  <div class="typing-settings flex">
    <div class="settings-card flex-grow-0 rounded-lg mx-auto flex my-5 text-sm">
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
          <li v-for="(v, mode) in configModes">
            <TextButton :icon="v.icon" :active="config.mode == mode" @click="config.mode = mode">
              {{ mode }}
            </TextButton>
          </li>
          <li class="separator" />
          <li v-for="modeOption in configModes[config.mode].options">
            <TextButton :icon="false" :active="config[config.mode] == modeOption" @click="(config[config.mode] as any) = modeOption">
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
