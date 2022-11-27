<script lang="ts" setup>
import TextButton from "../ui/TextButton.vue";
import { useConfigStore } from "~~/store/config"
const { config, configModes } = useConfigStore()
const availableIcons = [
  'i-mdi:at', 'i-mdi:numeric', 'i-mdi:clock', 'i-mdi:format-text-variant', 'i-mdi:format-quote-open'
]
</script>
<template>
    <div class="typing-settings flex">
        <div class="settings-card flex-grow-0 rounded-lg mx-auto flex my-5 text-sm">
            <div class="modes">
                <ul class="settings-list p-0 m-0 flex">
                    <li>
                        <text-button icon="i-mdi:at" :active="config.punctuation" @click="config.punctuation = !config.punctuation">punctuation</text-button>
                    </li>
                    <li>
                        <text-button icon="i-mdi:numeric" :active="config.numbers" @click="config.numbers = !config.numbers">numbers</text-button>
                    </li>
                    <li class="separator"></li>
                    <li v-for="(v, mode) in configModes">
                        <text-button @click="config.mode = mode" :icon="v.icon" :active="config.mode == mode">{{mode}}</text-button>
                    </li>
                    <li class="separator"></li>
                    <li v-for="modeOption in configModes[config.mode].options">
                        <text-button :icon="false" :active="config[config.mode] == modeOption" @click="(config[config.mode] as any) = modeOption">{{ modeOption }}</text-button>
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