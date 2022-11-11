<script lang="ts" setup>
import TextButton from "~/components/ui/TextButton.vue"
import { useTheme } from "~/composables/useTheme"

const { changeTheme, currentTheme } = useTheme()
</script>
<template>
    <div class="options-area-wrapper flex justify-center mt-5">
        <div class="options-area">
            <div class="options-bg  rounded-full"></div>
            <ul class="mx-auto m-0 list-none flex gap-1 pr-2 pl-0">
                <li class="flex items-center ">
                    <a class="bg-gray-100/4 hover:bg-gray-100/10 rounded-full px-4 block h-full" href="#">
                        <div class="i-mdi:cog mt-4"></div>
                    </a>
                </li>
                <li>
                    <text-button icon="mdi:earth" class="text-lg" title="language">english</text-button>
                </li>
                <li>
                    <text-button icon="mdi:palette" class="text-lg" title="theme" @click="changeTheme('dollar')">{{ currentTheme }}</text-button>
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