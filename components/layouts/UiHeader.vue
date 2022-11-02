<script setup lang="ts">
</script>

<template>
    <header class="py-5">
        <div class="container mx-auto">
            <div class="flex">
                <div class="menu-left w-full md:w-1/3">
                    <ul class="flex items-center  gap-5 list-none h-full p-0 my-0">
                        <li>
                            <a href="#" target="_blank" class="flex gap-2 items-center">
                                <div class='i-mdi:account w-6 h-6'/>
                                <span>Login</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="menu-center w-full md:w-1/3 text-center">
                    <h1 class="logo mt-0 mb-5">
                        <router-link to="/" class="text-white decoration-none italic">Speedtyper</router-link>
                    </h1>
                    <ul class="main-menu | flex justify-center gap-10 list-none my-0 p-0 font-bold">
                        <li>
                            <nuxt-link to="/">Home</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/">Race</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/">Learn</nuxt-link>
                        </li>
                    </ul>
                </div>
                <div class="menu-right w-full md:w-1/3">
                    <ul class="flex items-center justify-end gap-5 list-none h-full p-0 my-0">
                        <li>
                            <a href="https://github.com/zuramai/speedtyper" target="_blank" rel="noopener noreferrer">
                                <div class='i-mdi:github w-6 h-6'/>
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <div class='i-mdi:cog w-6 h-6'/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </header>
</template>

<style scoped>
</style>
