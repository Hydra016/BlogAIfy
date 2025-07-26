<template>
    <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div
            class="bg-white dark:bg-[#1e1e1e] text-black dark:text-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 class="text-2xl font-semibold mb-4">Are you sure you want to delete this post?</h2>
            <div class="flex justify-center gap-4">
                <button @click="appStore.setModalOpened(false)"
                    class="bg-[#FFD11A] text-[#1e1e1e] font-medium px-5 py-2 rounded hover:opacity-90 transition">
                    Close
                </button>
                <button
                    @click="blogStore.deleteBlog(appStore.modalBlogId, userStore.userId), appStore.setModalOpened(false)"
                    class="bg-transparent border border-[#FFD11A] text-[#FFD11A] font-medium px-5 py-2 rounded hover:bg-[#FFD11A] hover:text-[#1e1e1e] transition">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { useBlogStore } from '@/stores/BlogStore';
import { useUserStore } from '@/stores/userStore';

const appStore = useAppStore();
const blogStore = useBlogStore();
const userStore = useUserStore();

// blogStore.deleteBlog(blog.blog_id, userStore.userId)
</script>

<style scoped></style>