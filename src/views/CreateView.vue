<template>
    <div class="max-w-2xl mx-auto my-10 p-8 bg-[#1e1e1e] rounded-xl font-sans text-[#f0f0f0]">
        <h1 class="mb-6 text-3xl font-bold text-white">Create a New Blog Post</h1>

        <form @submit.prevent class="space-y-6">
            <div class="flex flex-col space-y-2">
                <label for="title" class="font-semibold text-[#dddddd]">Title</label>
                <div class="flex items-center w-full p-3 border border-[#444] rounded-md bg-[#2b2b2b] text-white">
                    <input ref="titleInput" v-model="blogStore.blog.title" type="text" id="title"
                        placeholder="Enter blog title" :disabled="blogStore.isLoading"
                        class="bg-[#2b2b2b] flex-1 placeholder:text-[#aaa] focus:outline-none focus:border-[#FFD11A] disabled:opacity-50 disabled:cursor-not-allowed" />
                    <div class="relative">
                        <i @click="handleEmojiPicker" class="pi pi-face-smile cursor-pointer"
                            style="font-size: 1rem"></i>
                        <EmojiPicker v-if="emojiPicker" theme="dark" class="absolute right-0" :native="true"
                            @select="onSelectEmoji" />
                    </div>
                </div>

            </div>

            <div class="flex flex-col space-y-2">
                <label for="content" class="font-semibold text-[#dddddd]">Content</label>
                <textarea v-model="blogStore.blog.content" id="content" rows="10" :disabled="blogStore.isLoading"
                    placeholder="Write your blog content..."
                    class="p-3 border border-[#444] rounded-md bg-[#2b2b2b] text-white placeholder:text-[#aaa] resize-none focus:outline-none focus:border-[#FFD11A] disabled:opacity-50 disabled:cursor-not-allowed"></textarea>

                <button @click="blogStore.writeWithAi(blogStore.blog.title)"
                    :disabled="!blogStore.blog.title.trim() || blogStore.isLoading" type="button" class="w-fit flex items-center gap-2 px-4 py-2 border border-[#FFD11A] text-[#FFD11A] rounded-md text-sm font-medium 
            enabled:hover:bg-[#FFD11A] enabled:hover:text-black transition 
            disabled:opacity-50 disabled:cursor-not-allowed">
                    <i class="pi pi-sparkles"></i>
                    Write with AI
                </button>
            </div>

            <div class="flex flex-col space-y-2">
                <label for="file" class="font-semibold text-[#dddddd]">Upload Image</label>
                <div
                    class="border border-[#444] rounded-md bg-[#2b2b2b] p-4 text-white flex items-center justify-between">
                    <input type="file" id="file" class="hidden" accept="image/*" @change="handleImageUpload"
                        :disabled="blogStore.isLoading" />
                    <label for="file"
                        class="cursor-pointer px-4 py-2 border border-[#FFD11A] text-[#FFD11A] rounded-md text-sm hover:bg-[#FFD11A] hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="{ 'pointer-events-none opacity-50': blogStore.isLoading }">
                        Choose File
                    </label>
                    <div v-if="blogStore.blog_image_file">
                        <span class="text-sm text-gray-400 truncate ml-4">
                            {{ blogStore.blog_image_file.name }}
                        </span>
                    </div>
                </div>
            </div>

            <button type="submit" @click="blogStore.submitBlog(userStore.userId, userStore.userMetadata.full_name)"
                :disabled="!blogStore.blog.title.trim() || !blogStore.blog.content.trim() || blogStore.isLoading"
                class="px-6 py-3 bg-[#FFD11A] text-[#1e1e1e] font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <span v-if="!blogStore.isLoading">Publish</span>
                <i v-else class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
            </button>

            <div v-if="blogStore.blogErrMsg"
                class="bg-[#2a1e1e] border border-red-600 text-red-400 px-4 py-3 rounded-md mb-4">
                <span class="text-sm font-medium">{{ blogStore.blogErrMsg }}</span>
            </div>
        </form>
    </div>
</template>


<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'
import { useBlogStore } from '@/stores/BlogStore'
import { useUserStore } from '@/stores/userStore'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { nextTick, onMounted, ref } from 'vue';

const userStore = useUserStore();
const blogStore = useBlogStore();
const appStore = useAppStore();
const titleInput = ref<HTMLInputElement | null>(null);
const emojiPicker = ref<boolean>(false);

const handleImageUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    blogStore.blog_image_file = file
};

const handleEmojiPicker = () => {
    emojiPicker.value = !emojiPicker.value
}

function onSelectEmoji(emoji: { i: string }) {
    const input = titleInput.value;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const text = blogStore.blog.title;

    const before = text.substring(0, start);
    const after = text.substring(end);

    blogStore.blog.title = before + emoji.i + after;

    nextTick(() => {
        const pos = start + emoji.i.length;
        input.setSelectionRange(pos, pos);
        input.focus();
    });
}

onMounted(() => {
    blogStore.resetBlog();
});
</script>
