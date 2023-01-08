<script setup lang="ts">
</script>

<template>
  <header class="py-5">
    <div class="container px-25">
      <div class="flex justify-between">
        <div class="menu-left">
          <h1 class="logo mt-0 mb-5">
            <router-link to="/" class="decoration-none italic">
              Ngetikcepat
            </router-link>
          </h1>
        </div>
        <div class="menu-right">
          <ul class="flex items-center justify-end gap-5 list-none h-full p-0 my-0">
            <li>
              <a href="https://github.com/zuramai/ngetikcepat" target="_blank" rel="noopener noreferrer">
                <div class="i-mdi:github w-6 h-6" />
              </a>
            </li>
            <li>
              <nuxt-link to="/settings" rel="noopener noreferrer">
                <div class="i-mdi:cog w-6 h-6" />
              </nuxt-link>
            </li>
            <li class="menu-separator h-[20px]! border-r " />
            <li>
              <nuxt-link to="/auth/login" class="flex gap-2 items-center">
                <div class="i-mdi:account w-6 h-6" />
                <span>Login</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.router-link-active {
    color: rgb(206, 206, 206)
}
.logo a {
  color: var(--main-color)
}
</style>
