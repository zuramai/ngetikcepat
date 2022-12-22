<script lang="ts" setup>
const props = defineProps({
  active: Boolean,
  icon: [String, Boolean],
})

defineEmits(['click'])
</script>

<template>
  <a href="#" class="text-button" :class="[active === true ? 'active' : '']" @click="$emit('click')">
    <div v-show="icon" :class="icon" />
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
