<script lang="ts" setup>
defineProps<{
  to: string
}>()
</script>

<template>
  <li>
    <nuxt-link :to="to" class="block p-2">
      <slot name="icon">
        <div class="i-mdi:home" />
      </slot>
    </nuxt-link>
  </li>
</template>
