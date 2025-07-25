<template>
    <div v-if="!blogStore.isLoading">
        <div class="relative h-80 md:h-[400px] w-full overflow-hidden rounded-b-xl mt-10 rounded-t-2xl">
            <img :src="blogStore.blog.blog_image || fallbackImage" alt="Blog Image"
                class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e1e1e]"></div>
        </div>

        <div class="max-w-4xl mx-auto px-4 py-10 text-[#f0f0f0]">
            <h1 class="text-4xl font-extrabold text-white mb-6">{{ blogStore.blog.title }}</h1>

            <div class="flex justify-between items-center text-sm text-gray-400 mb-6">
                <span>
                    {{ formatTime(blogStore.blog.created_at) }}
                </span>
                <div class="flex items-center gap-5">
                    <span>
                        {{ formatDate(blogStore.blog.created_at) }}
                    </span>
                    <div v-if="!blogStore.isLikesLoading"
                        class="cursor-pointer flex items-center gap-2 border border-gray-400 py-2 px-3 rounded-full">
                        <i @click="userStore.userId
                            ? blogStore.likePost(blogStore.blog.blog_id)
                            : appStore.setModalOpened(true, 'Login')" v-if="!blogStore.likedPost.isLiked"
                            class="pi pi-heart text-gray-400 cursor-pointer" style="font-size: 1rem;"></i>
                        <i @click="blogStore.unLikePost(blogStore.blog.blog_id)" v-else
                            class="pi pi-heart-fill text-red-500" style="font-size: 1rem;"></i>
                        <span>{{ blogStore.blog.likes_count }}</span>
                    </div>
                    <i v-else class="pi pi-spin pi-spinner text-[#FFD11A]" style="font-size: 1rem"></i>

                </div>
            </div>

            <p class="text-lg leading-relaxed mb-10 whitespace-pre-line tracking-wide">
                {{ blogStore.blog.content }}
            </p>

            <div class="flex justify-between items-center text-sm text-[#aaa] italic mt-4">
                <div class="flex items-center gap-2">
                    <i class="pi pi-eye"></i>
                    <span>{{ blogStore.blog.view_count + 1 }}</span>
                </div>
                <div class="text-right">
                    — {{ blogStore.blog.user_name }}
                </div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-4 pb-20 text-[#f0f0f0]">
            <h2 class="text-2xl font-semibold text-white mb-4">Comments</h2>
            <CommentForm :blog_id="id" />
            <div class="space-y-6">
                <Comment v-for="comment in blogStore.comments" :author="comment.author" :content="comment.content"
                    :posted_at="comment.posted_at" :posted_time="comment.posted_at" :user_id="comment.user_id"
                    :blog_id="comment.blog_id" :comment_id="comment.comment_id" />
            </div>
        </div>
    </div>

    <div v-else class="w-full h-[60vh] flex justify-center items-center">
        <i class="pi pi-spin pi-spinner text-[#FFD11A]" style="font-size: 2rem"></i>
    </div>
</template>



<script setup lang="ts">
import { useBlogStore } from '@/stores/BlogStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import fallbackImage from '@/assets/template.jpg'
import Comment from '@/components/Blog/Comment.vue';
import CommentForm from '@/components/Blog/CommentForm.vue';
import { formatDate, formatTime } from '@/helpers/formatDate';
import { useUserStore } from '@/stores/userStore';
import { useAppStore } from '@/stores/appStore';

const route = useRoute();
const blogStore = useBlogStore();
const userStore = useUserStore();
const appStore = useAppStore();
const id: string = route.params.id as string;

onMounted(async () => {
    await blogStore.fetchBlog(id);
    await blogStore.updateViewCount(id);
    await blogStore.getAllComments(id);
    await blogStore.checkLikedData(id);
})
</script>

<style scoped></style>