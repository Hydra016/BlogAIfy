<template>
    <div class="bg-[#181818] border border-[#2a2a2a] rounded-lg overflow-hidden flex flex-col h-full">
        <img :src="props.blog.blog_image ? props.blog.blog_image : fallbackImage" alt="Blog Image"
            class="w-full h-40 object-cover" />
        <div class="flex flex-col flex-grow p-6">
            <h2 class="text-xl font-semibold mb-2 truncate">{{ props.blog.title }}</h2>

            <p class="text-sm text-gray-400 mb-4 line-clamp-4">
                {{ props.blog.content }}
            </p>

            <p class="text-xs text-gray-500 mt-auto mb-3">
                {{ new Date(props.blog.created_at).toLocaleDateString() }}
            </p>

            <div v-if="props.secondary">
                <div class="flex justify-between items-center text-sm text-[#aaa] italic mb-4">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-1">
                            <i class="pi pi-eye"></i>
                            <span>{{ blog.view_count }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <i class="pi pi-comments"></i>
                            <span>{{ props.blog.comment_count }}</span>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-auto">
                        {{ new Date(blog.created_at).toLocaleDateString() }}
                    </p>
                </div>

                <div class="flex items-center justify-between w-full mb-5">
                    <p class="text-xs text-gray-500 mt-auto">
                        Posted by: {{ blog.user_name }}
                    </p>
                    <div class="flex items-center gap-3">
                        <i @click="appStore.setModalOpened(true, 'EditModal', blog.blog_id)"
                            class="pi pi-pencil text-[#FFD11A] cursor-pointer" style="font-size: 0.8rem"></i>
                        <i @click="appStore.setModalOpened(true, 'DeleteModal', blog.blog_id)"
                            class="pi pi-trash text-[#FFD11A] cursor-pointer" style="font-size: 0.8rem"></i>
                    </div>
                </div>
            </div>

            <div v-if="props.primary" class="flex justify-between items-center text-sm text-[#aaa] italic mb-4">
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1">
                        <i class="pi pi-eye"></i>
                        <span>{{ blog.view_count }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <i class="pi pi-comments"></i>
                        <span>{{ props.blog.comment_count }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <i class="pi pi-heart"></i>
                        <span>{{ props.blog.likes_count }}</span>
                    </div>
                </div>
                <div class="text-right">
                    — {{ props.blog.user_name }}
                </div>
            </div>

            <RouterLink :to="`/blogs/${props.blog.blog_id}`"
                class="w-full border border-[#FFD11A] text-[#FFD11A] py-2 px-5 text-center rounded-md text-sm font-medium hover:bg-[#FFD11A] hover:text-black transition">
                View
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import fallbackImage from '@/assets/template.jpg'
import { useAppStore } from '@/stores/appStore';

const props = defineProps(['blog', 'primary', 'secondary'])
const appStore = useAppStore();
</script>

<style scoped></style>