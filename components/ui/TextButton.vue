<script lang="ts" setup>
const props = defineProps({
  active: Boolean,
  icon: [String, Boolean]
})
</script>
<template>
  <a href="#" :class="['text-button', active === true ? 'active' : '']">
    <div :class="[`i-${icon}`]" v-show="icon"></div>
    <span>
      <slot></slot>
    </span>
  </a>
</template>
<style>
.text-button {
    display: flex;
    align-items: center;
    gap: .3rem;
    padding: .7rem;
}
.text-button.active {
  color: var(--main-color)
}
</style>