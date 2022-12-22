<script lang="ts" setup>
const props = defineProps({
  active: Boolean,
  icon: [String, Boolean],
})

defineEmits(['click'])
</script>

<template>
  <a href="#" class="text-button inline-block" :class="[active === true ? 'active' : '']" @click="$emit('click')">
    <slot name="icon">
      <div v-show="icon || $slots.icon" :class="icon" />
    </slot>

    <span>
      <slot />
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
