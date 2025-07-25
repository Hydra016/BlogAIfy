<template>
    <div>
        <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div v-if="!blogStore.isLoading"
                class="bg-[#121212] text-white p-8 rounded-lg w-full max-w-2xl shadow-[0_0_0_1px_#2a2a2a]">
                <h2 class="text-2xl font-semibold mb-6">Edit Blog Post</h2>
                <form @submit.prevent class="flex flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <label for="edit-title" class="text-sm text-gray-400 text-left">Title<span
                                class="text-red-500 ml-1">*</span></label>
                        <input id="edit-title" type="text" placeholder="Enter blog title" v-model="blogStore.blog.title"
                            class="w-full bg-[#1e1e1e] text-white px-4 py-2 rounded-md placeholder:text-gray-500 border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#FFD11A]" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="edit-content" class="text-sm text-gray-400 text-left">Content<span
                                class="text-red-500 ml-1">*</span></label>
                        <textarea v-model="blogStore.blog.content" id="edit-content" rows="8"
                            placeholder="Edit your blog content..."
                            class="w-full bg-[#1e1e1e] text-white px-4 py-2 rounded-md placeholder:text-gray-500 border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#FFD11A] resize-none"></textarea>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="edit-image" class="text-sm text-gray-400 text-left">Change Image</label>
                        <input @change="handleImageUpload" id="edit-image" type="file"
                            class="text-gray-300 file:bg-[#FFD11A] file:text-[#141414] file:px-4 file:py-1 file:rounded-md file:mr-4 cursor-pointer" />
                    </div>
                </form>

                <div class="flex justify-end gap-4 mt-6">
                    <button
                        @click="blogStore.updateBlog(appStore.modalBlogId, userStore.userId), appStore.setModalOpened(false)"
                        class="border border-[#FFD11A] text-[#FFD11A] px-6 py-2 rounded-md font-medium hover:bg-[#FFD11A] hover:text-black transition">
                        Save Changes
                    </button>

                    <button @click="appStore.setModalOpened(false)"
                        class="bg-[#FFD11A] text-[#141414] px-6 py-2 rounded-md font-medium hover:opacity-90 transition">
                        Cancel
                    </button>
                </div>
            </div>
            <div class="w-full h-[60vh] flex justify-center items-center" v-else>
                <i class="pi pi-spin pi-spinner text-[#FFD11A]" style="font-size: 2rem"></i>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { useBlogStore } from '@/stores/BlogStore';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

const appStore = useAppStore();
const blogStore = useBlogStore();
const userStore = useUserStore();
onMounted(async () => {
    await blogStore.fetchBlog(appStore.modalBlogId);
})

const handleImageUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    blogStore.blog_image_file = file
};
</script>

<style scoped></style>