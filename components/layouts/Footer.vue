<script lang="ts" setup>
const now = new Date()
</script>

<template>
  <footer class="mt-10 px-25 mx-auto">
    <p class="">
      Copyright &copy; {{ now.getFullYear() }} Crafted by
      <a href="https://github.com/zuramai" target="_blank" class="underline">zuramai</a>
    </p>
  </footer>
</template>
