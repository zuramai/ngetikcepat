<template>
  <div class="sidebar | flex items-center fixed h-screen top-0 w-10 p-2 border-r-1">
    <ul class="main-menu | px-0 list-none">
      <LayoutsSidebarItem to="/" title="Home">
        <template #icon>
          <div class="i-mdi:home w-6 h-6" />
        </template>
      </LayoutsSidebarItem>
      <LayoutsSidebarItem to="/race" title="Race">
        <template #icon>
          <div class="i-mdi:flash-outline w-6 h-6" />
        </template>
      </LayoutsSidebarItem>
      <LayoutsSidebarItem to="/learn" title="Learn">
        <template #icon>
          <div class="i-mdi:reminder w-6 h-6" />
        </template>
      </LayoutsSidebarItem>
    </ul>
  </div>
</template>
