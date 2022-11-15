<script lang="ts" setup>
import "normalize.css"
import "~/assets/css/main.css"
import UiHeader from "./components/layouts/UiHeader.vue";
import UiFooter from "./components/layouts/UiFooter.vue";

const theme = useTheme()

const themeUrl = computed(() => `/themes/${theme.currentTheme.value}.css`) 

useHead({
  title: "Speedtyper",

  link: [
        { rel:"stylesheet", type: "text/css", href: themeUrl}
    ]
})


</script>
<template>
  <div id="app" class="font-sans flex w-full flex-col min-h-screen" @keyup="keyup">
    <UiHeader></UiHeader>
    <NuxtLayout class="flex-grow">
        <NuxtPage></NuxtPage>
    </NuxtLayout>
    <UiFooter></UiFooter>
  </div>
</template>
<style>

</style>