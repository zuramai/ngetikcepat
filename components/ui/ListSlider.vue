<script lang="ts" setup>
const props = defineProps<{
  labels: string[]
}>()
</script>

<template>
  <div class="list-slider w-40 relative">
    <ul class="flex relative gap-5 list-none px-0 justify-center my-0 overflow-hidden">
      <li v-for="(label, key) in labels" :key="key">
        <a href="#">
          {{ label }}
        </a>
      </li>
      <div class="list-slider__controls flex justify-between absolute w-full h-full z-2">
        <div class="control-left">
          &laquo;
        </div>
        <div class="control-right">
          &raquo;
        </div>
      </div>
    </ul>
  </div>
</template>

<style>
.list-slider .list-slider__controls {
  background: linear-gradient(to right, var(--sub-alt-color), transparent, var(--sub-alt-color));
}
</style>
