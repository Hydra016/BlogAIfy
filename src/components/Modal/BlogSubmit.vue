<template>
    <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div
            class="bg-white dark:bg-[#1e1e1e] text-black dark:text-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 class="text-2xl font-semibold mb-4">Blog Published Successfully</h2>
            <p class="mb-6 text-sm text-gray-700 dark:text-gray-300">
                Your blog post has been successfully submitted. You can now close this window or start writing a new
                post.
            </p>

            <div class="flex justify-center gap-4">
                <RouterLink @click="appStore.setModalOpened(false)"
                    class="bg-[#FFD11A] text-[#1e1e1e] font-medium px-5 py-2 rounded hover:opacity-90 transition"
                    to="/">
                    Close
                </RouterLink>
                <button @click="appStore.setModalOpened(false)"
                    class="bg-transparent border border-[#FFD11A] text-[#FFD11A] font-medium px-5 py-2 rounded hover:bg-[#FFD11A] hover:text-[#1e1e1e] transition">
                    Create Another
                </button>

                {{ }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { RouterLink } from 'vue-router';

const appStore = useAppStore();
</script>

<style scoped></style>