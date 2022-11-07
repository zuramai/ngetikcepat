<script lang="ts" setup>
import { useTypingStore } from "~/store/typing"
const typing = useTypingStore()

</script>
<template>
    <div class="typing-settings flex">
        <div class="settings-card flex-grow-0 rounded-lg mx-auto flex my-5 text-sm">
            <div class="modes">
                <ul class="settings-list p-0 m-0 flex">
                    <li>
                        <a href="#" class="text-button">
                            <div class="i-mdi:at"></div>
                            <span>punctuation</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-button">
                            <div class="i-mdi:numeric"></div>
                            <span>numbers</span>
                        </a>
                    </li>
                    <li class="separator"></li>
                    <li>
                        <a href="#" class="text-button">
                            <div class="i-mdi:clock"></div>
                            <span>time</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-button">
                            <div class="i-mdi:format-text-variant"></div>
                            <span>words</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-button">
                            <div class="i-mdi:format-quote-open"></div>
                            <span>quote</span>
                        </a>
                    </li>
                    <li class="separator"></li>
                    <template v-if="typing.mode == 'time'">
                        <li>
                            <a href="#" class="text-button">
                                <span>15</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="text-button">
                                <span>30</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="text-button">
                                <span>45</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="text-button">
                                <span>60</span>
                            </a>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
.settings-card {
    background-color: var(--sub-alt-color);
}
.text-button {
    display: flex;
    align-items: center;
    gap: .3rem;
    padding: .7rem;
}
.settings-list {
    list-style: none;
}
.separator {
    width: 2px;
    margin: .6rem 0;
    height: auto;
    background-color: var(--sub-color);
}
</style>