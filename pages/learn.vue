<script lang="ts" setup>
import packageJSON from '~/package.json'
</script>

<template>
  <div class="text-center text-gray-300">
    <h1 class="text-6xl">
      Coming soon..
    </h1>
    <p>Check for updates regularly on <a :href="packageJSON.homepage" target="_blank" />GitHub</p>
  </div>
</template>
