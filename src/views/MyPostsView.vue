<template>
    <div class="min-h-screen bg-[#1e1e1e] text-white px-4 py-10">
        <h1 class="text-3xl font-bold mb-8 text-center text-[#FFD11A]">Your Blog Posts</h1>

        <div v-if="!blogStore.isLoading">
            <div v-if="blogStore.sortedBlogs.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card v-for="blog in blogStore.sortedBlogs" :key="blog.blog_id" :blog="blog" :secondary="true" />
            </div>

            <div v-else class="text-center text-gray-500 mt-20">
                No blogs published yet.
            </div>
        </div>
        <div class="w-full h-[60vh] flex justify-center items-center" v-else>
            <i class="pi pi-spin pi-spinner text-[#FFD11A]" style="font-size: 2rem"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/BlogStore';
import { watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import Card from '@/components/Blog/Card.vue';

const blogStore = useBlogStore();
const userStore = useUserStore();
watch(
    () => userStore.userId,
    async (newId) => {
        if (newId) {
            await blogStore.fetchBlogsByUser(newId);
        }
    },
    { immediate: true }
);
</script>

<style></style>
