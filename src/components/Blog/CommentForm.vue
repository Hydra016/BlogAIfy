<template>
    <div class="mb-8">
        <label for="comment" class="block text-sm text-gray-400 mb-2">Leave a Comment</label>
        <textarea v-model="blogStore.comment.content" id="comment" placeholder="Write your thoughts..." rows="4"
            class="w-full p-4 bg-[#2b2b2b] border border-[#444] rounded-md text-white placeholder:text-[#aaa] resize-none focus:outline-none focus:border-[#FFD11A]"></textarea>
        <button @click="blogStore.postComment(props.blog_id)"
            class="mt-3 px-6 py-2 bg-[#FFD11A] text-[#1e1e1e] font-semibold rounded-md hover:opacity-90 transition disabled:opacity-50"
            :disabled="!blogStore.isCommentLoading && !!!blogStore.comment.content.trim()">
            <span v-if="!blogStore.isCommentLoading">Post Comment</span>
            <i v-else class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/BlogStore';

const blogStore = useBlogStore();
const props = defineProps(['blog_id']);
</script>

<style scoped></style>