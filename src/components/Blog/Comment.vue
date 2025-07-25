<template>
    <div class="p-4 bg-[#1e1e1e] border border-[#333] rounded-lg">
        <div class="flex justify-between items-center mb-2">
            <span class="font-semibold text-white">{{ props.author }}</span>
            <span class="text-sm text-gray-500">{{ formatTime(props.posted_at) }}</span>
        </div>
        <p class="text-gray-300 mb-2">{{ props.content }}</p>

        <div v-if="props.user_id === userStore.userId" class="flex gap-4 text-sm text-gray-500">
            <span @click="blogStore.deleteComment(props.comment_id, props.blog_id)"
                class="cursor-pointer hover:text-red-400 transition">Delete</span>
        </div>
    </div>
</template>



<script setup lang="ts">
import { formatTime } from '@/helpers/formatDate';
import { useBlogStore } from '@/stores/BlogStore';
import { useUserStore } from '@/stores/userStore';

const props = defineProps(['author', 'posted_at', 'content', 'user_id', 'comment_id', 'blog_id']);
const userStore = useUserStore();
const blogStore = useBlogStore();
</script>

<style scoped></style>