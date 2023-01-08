<script lang="ts" setup>
import 'normalize.css'
import '~/assets/css/main.css'

const theme = useTheme()
const app = ref()

const config = useAppConfig()
const themeUrl = computed(() => `${config.baseUrl}themes/${theme.currentTheme.value}.css`)

useHead({
  title: 'Ngetikcepat',

  link: [
    { rel: 'stylesheet', type: 'text/css', href: themeUrl },
  ],
})
provide('app', app)

const keydown = () => {
  console.log('keydown')
}
</script>

<template>
  <div id="app" ref="app" class="font-sans flex w-full flex-col min-h-screen">
    <NuxtLayout class="flex-grow">
      <NuxtPage />
    </NuxtLayout>
    <LayoutsFooter />
  </div>
</template>

<style>

</style>
