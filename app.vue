<script lang="ts" setup>
import "normalize.css"
import "~/assets/themes/dark-red.css"
import "~/assets/css/main.css"
import UiHeader from "./components/layouts/UiHeader.vue";
import UiFooter from "./components/layouts/UiFooter.vue";
</script>
<template>
  <div class="font-sans flex w-full flex-col min-h-screen">
    <UiHeader></UiHeader>
    <NuxtLayout class="flex-grow">
      <NuxtPage></NuxtPage>
    </NuxtLayout>
    <UiFooter></UiFooter>
  </div>
</template>
<style>

</style>