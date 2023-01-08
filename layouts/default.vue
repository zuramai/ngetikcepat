<script lang="ts" setup>
</script>

<template>
  <div class="layout-default">
    <LayoutsSidebar />
    <main>
      <div class="px-25 container mx-auto">
        <LayoutsHeader />
        <slot />
      </div>
    </main>
  </div>
</template>
