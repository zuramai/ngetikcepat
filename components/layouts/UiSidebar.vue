<template>
  <div class="sidebar | flex items-center fixed h-screen top-0 w-10 p-2 border-r-1">
    <ul class="main-menu | px-0 list-none">
      <layouts-ui-sidebar-item to="/">
        <template #icon>
          <div class="i-mdi:home w-6 h-6" />
        </template>
      </layouts-ui-sidebar-item>
      <layouts-ui-sidebar-item to="/race">
        <template #icon>
          <div class="i-mdi:flash-outline w-6 h-6" />
        </template>
      </layouts-ui-sidebar-item>
      <layouts-ui-sidebar-item to="/learn">
        <template #icon>
          <div class="i-mdi:reminder w-6 h-6" />
        </template>
      </layouts-ui-sidebar-item>
    </ul>
  </div>
</template>
