<script setup lang="ts">
import { useTypingStore } from '~~/store/typing';

const { getResult } = useTypingStore()

const result = getResult()

</script>
<template>
    <div class="container mx-auto my-12">
        <div class="result-header flex justify-center gap-20 text-center">
            <div class="group">
                <div class="text-2xl mb-5">wpm</div>
                <div class="text-7xl font-bold">{{ result.wpm }}</div>
            </div>
            <div class="group">
                <div class="text-2xl mb-5">accuracy</div>
                <div class="text-7xl font-bold">{{ result.accuracy }}%</div>
            </div>
        </div>
    </div>
</template>