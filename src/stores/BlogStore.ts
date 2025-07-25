import { computed, onMounted, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import supabase from '@/supabase';
import { useAppStore } from './appStore';
import { useUserStore } from './userStore';
import router from '@/router';

type Blog = {
    blog_id: string;
    user_id: string;
    user_name: string;
    title: string;
    content: string;
    blog_image: string;
    created_at?: string
    view_count: number;
    comment_count: number;
    likes_count: number;
}

type Comment = {
    comment_id: string;
    content: string;
    author: string;
    posted_at: string;
    blog_id: string;
    user_id: string;
}

type Like = {
    isLiked: boolean;
    user_id: string;
    blog_id: string;
}

export const useBlogStore = defineStore('blogStore', () => {
    const userStore = useUserStore();
    const OPENAI_API_URL = import.meta.env.VITE_OPENAI_KEY;
    const blog = reactive<Blog>({
        blog_id: crypto.randomUUID(),
        user_name: '',
        user_id: '',
        title: '',
        content: '',
        blog_image: '',
        created_at: new Date().toISOString(),
        view_count: 0,
        comment_count: 0,
        likes_count: 0
    });
    const blogErrMsg = ref<string | undefined>('');
    const blogs = reactive<Blog[]>([]);
    const isLoading = ref<boolean>(false);
    const appStore = useAppStore();
    const blog_image_file = ref<File | null>(null);
    const comment = reactive<Comment>({
        comment_id: crypto.randomUUID(),
        content: '',
        author: userStore.userMetadata?.full_name,
        posted_at: new Date().toISOString(),
        blog_id: '',
        user_id: userStore.userId
    });
    const comments = reactive<Comment[]>([]);
    const isCommentLoading = ref<boolean>(false);
    const likedPost = reactive<Like>({
        isLiked: false,
        user_id: userStore.userId,
        blog_id: ''
    });
    const isLikesLoading = ref<boolean>(true);

    const submitBlog = async (id: string, name: string) => {
        blog.user_id = id;
        blog.user_name = name;
        isLoading.value = true;

        if (blog_image_file.value) {
            const file = blog_image_file.value;
            const filePath = `blogs/${Date.now()}_${file.name}`;

            const { error: uploadError } = await supabase.storage
                .from('blogify')
                .upload(filePath, file);

            if (uploadError) {
                blogErrMsg.value = 'Image upload failed: ' + uploadError.message;
                isLoading.value = false;
                return;
            }

            const { data: urlData } = supabase
                .storage
                .from('blogify')
                .getPublicUrl(filePath);

            blog.blog_image = urlData.publicUrl;
        }

        const { data, error } = await supabase
            .from("Blogs")
            .insert(blog)
            .select("*");

        if (!error) {
            Object.assign(blog, {
                blog_id: crypto.randomUUID(),
                user_id: '',
                user_name: '',
                title: '',
                content: '',
                blog_image: '',
                created_at: new Date().toISOString(),
                view_count: 0,
            });

            blog_image_file.value = null
            isLoading.value = false;
            appStore.setModalOpened(true, 'BlogSubmit');
        } else {
            blogErrMsg.value = error.message;
            isLoading.value = false;
        }
    };

    const fetchBlog = async (id: string) => {
        isLoading.value = true;
        const { data, error } = await supabase
            .from("Blogs")
            .select("*")
            .eq("blog_id", id)
            .single();

        if (data && !error) {
            Object.assign(blog, data);
        } else {
            router.replace({ name: 'NotFound' })
        }
        isLoading.value = false;
    };

    const fetchBlogs = async () => {
        isLoading.value = true;
        const { data, error } = await supabase.from("Blogs").select("*")
        if (data) {
            isLoading.value = false;
            blogs.splice(0, blogs.length, ...data)
        }
    }

    const fetchBlogsByUser = async (id: string) => {
        isLoading.value = true;
        const { data, error } = await supabase
            .from("Blogs")
            .select("*")
            .eq("user_id", id)

        if (data && !error) {
            blogs.splice(0, blogs.length, ...data)
        } else {
            blogs.splice(0, blogs.length)
        }
        isLoading.value = false;
    }

    const updateViewCount = async (id: string) => {
        const { data, error } = await supabase
            .from("Blogs")
            .select("view_count")
            .eq("blog_id", id)
            .single();

        if (error || !data) {
            blogErrMsg.value = error.message;
            return;
        }

        const { error: updateError } = await supabase
            .from("Blogs")
            .update({ view_count: data.view_count + 1 })
            .eq("blog_id", id);

        if (updateError) {
            blogErrMsg.value = updateError.message;
        }
    }

    const deleteBlog = async (id: string, userId: string) => {
        isLoading.value = true;
        const { error } = await supabase.from('Blogs').delete().eq('blog_id', id);
        const { data, error: fetchError } = await supabase
            .from("Blogs")
            .select("*")
            .eq("user_id", userId)

        if (data && !error) {
            blogs.splice(0, blogs.length, ...data)
        }
        isLoading.value = false;
        if (error) {
            blogErrMsg.value = error.message;
        }
    }

    const updateBlog = async (id: string, user_id: string) => {
        try {
            isLoading.value = true;
            blogErrMsg.value = '';

            if (blog.blog_image) {
                const imagePath = blog.blog_image.split('/storage/v1/object/public/blogify/')[1];
                if (imagePath) {
                    const { error: deleteError } = await supabase.storage
                        .from('blogify')
                        .remove([imagePath]);

                    if (deleteError) {
                        console.error('Failed to delete old image:', deleteError.message);
                    }
                }
            }

            if (blog_image_file.value) {
                const file = blog_image_file.value;
                const filePath = `blogs/${Date.now()}_${file.name}`;

                const { error: uploadError } = await supabase.storage
                    .from('blogify')
                    .upload(filePath, file);

                if (uploadError) {
                    blogErrMsg.value = 'Image upload failed: ' + uploadError.message;
                    return;
                }

                const { data: urlData } = supabase
                    .storage
                    .from('blogify')
                    .getPublicUrl(filePath);

                blog.blog_image = urlData.publicUrl;
            }

            const { data, error } = await supabase
                .from('Blogs')
                .update({
                    title: blog.title,
                    content: blog.content,
                    blog_image: blog.blog_image
                })
                .eq('blog_id', id)
                .select();

            if (error) {
                blogErrMsg.value = `Update failed: ${error.message}`;
            } else {
                const { data: userBlogs, error: fetchError } = await supabase
                    .from('Blogs')
                    .select('*')
                    .eq('user_id', user_id);

                if (!fetchError && userBlogs) {
                    blogs.splice(0, blogs.length, ...userBlogs);
                } else if (fetchError) {
                    console.error('Failed to fetch user blogs:', fetchError.message);
                }
            }
        } catch (err) {
            blogErrMsg.value = 'Unexpected error occurred during update.';
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    };


    const resetBlog = () => {
        if ('id' in blog) {
            delete blog.id;
        }

        Object.assign(blog, {
            blog_id: crypto.randomUUID(),
            user_id: '',
            user_name: '',
            title: '',
            content: '',
            blog_image: '',
            created_at: new Date().toISOString(),
            view_count: 0,
        });
    };

    const sortedBlogs = computed(() => {
        return [...blogs].sort((a, b) => b.view_count - a.view_count);
    });

    const writeWithAi = async (text: string) => {
        isLoading.value = true
        const APIBody = {
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `write a blog about this title - ${text}, do not add any # or any headings, write 3 paragraphs and don't make it huge.`,
                },
            ],
            max_tokens: 2048,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_URL}`,
            },
            body: JSON.stringify(APIBody),
        });

        const openAiData = await response.json();
        if (openAiData) {
            isLoading.value = false
            blog.content = openAiData.choices[0].message.content
        }
    }

    const getAllComments = async (id: string) => {
        isCommentLoading.value = true;
        const { data, error } = await supabase.from("Comments").select("*").eq("blog_id", id);
        if (data) {
            comments.splice(0, comments.length, ...data);
            isCommentLoading.value = false;
        }
    }

    const postComment = async (id: string) => {
        comment.blog_id = id;
        isCommentLoading.value = true;

        const { data, error } = await supabase
            .from("Comments")
            .insert(comment)
            .select("*");

        if (data) {
            comment.content = '';
            comment.comment_id = '';

            comments.push(data[0]);

            const { data: blogData, error: blogError } = await supabase
                .from("Blogs")
                .select("comment_count")
                .eq("blog_id", id)
                .single();

            if (!blogError && blogData) {
                await supabase
                    .from("Blogs")
                    .update({ comment_count: blogData.comment_count + 1 })
                    .eq("blog_id", id);

                const blogToUpdate = blogs.find(blog => blog.blog_id === id);
                if (blogToUpdate) {
                    blogToUpdate.comment_count += 1;
                }
            }

            isCommentLoading.value = false;
        }

        if (error) {
            blogErrMsg.value = error.message;
            isCommentLoading.value = false;
        }
    };


    const deleteComment = async (id: string, blog_id: string) => {
        const { error } = await supabase.from('Comments').delete().eq('comment_id', id);

        if (!error) {
            const index = comments.findIndex(comment => comment.comment_id === id);
            if (index !== -1) {
                comments.splice(index, 1);
            }

            const { data: blogData, error: blogError } = await supabase
                .from('Blogs')
                .select('comment_count')
                .eq('blog_id', blog_id)
                .single();

            if (!blogError && blogData && blogData.comment_count > 0) {
                await supabase
                    .from('Blogs')
                    .update({ comment_count: blogData.comment_count - 1 })
                    .eq('blog_id', blog_id);

                const blog = blogs.find(b => b.blog_id === blog_id);
                if (blog && blog.comment_count > 0) {
                    blog.comment_count -= 1;
                }

                if (blog && blog.blog_id === blog_id && blog.comment_count > 0) {
                    blog.comment_count -= 1;
                }
            }
        } else {
            console.error('Error deleting comment:', error.message);
        }
    };

    const checkLikedData = async (id: string) => {
        const { data, error } = await supabase
            .from('Likes')
            .select('*')
            .eq('blog_id', id)
            .eq('user_id', userStore.userId)


        if (data && data?.length > 0) {
            likedPost.isLiked = true
            isLikesLoading.value = false
        } else {
            likedPost.isLiked = false
            isLikesLoading.value = false
        }
    }

    const likePost = async (id: string) => {
        likedPost.blog_id = id;
        likedPost.isLiked = true
        blog.likes_count += 1
        const { data, error } = await supabase
            .from("Likes")
            .insert({
                user_id: likedPost.user_id,
                blog_id: likedPost.blog_id
            })
            .select("*");

        if (data) {
            likedPost.blog_id = ''
            console.log(data)
            const { data: blogData, error: blogError } = await supabase
                .from("Blogs")
                .select("likes_count")
                .eq("blog_id", id)
                .single();

            if (!blogError && blogData) {
                await supabase
                    .from("Blogs")
                    .update({ likes_count: blogData.likes_count + 1 })
                    .eq("blog_id", id);
            }
        }
    }

    const unLikePost = async (id: string) => {
        likedPost.blog_id = id;
        likedPost.isLiked = false
        blog.likes_count -= 1
        const { error: deleteError } = await supabase
            .from("Likes")
            .delete()
            .eq("user_id", likedPost.user_id)
            .eq("blog_id", likedPost.blog_id);

        if (!deleteError) {
            likedPost.blog_id = '';

            const { data: blogData, error: blogError } = await supabase
                .from("Blogs")
                .select("likes_count")
                .eq("blog_id", id)
                .single();

            if (!blogError && blogData && blogData.likes_count > 0) {
                await supabase
                    .from("Blogs")
                    .update({ likes_count: blogData.likes_count - 1 })
                    .eq("blog_id", id);
            }
        }
    }

    return {
        blog,
        submitBlog,
        isLoading,
        blogErrMsg,
        fetchBlogs,
        fetchBlog,
        blog_image_file,
        fetchBlogsByUser,
        updateViewCount,
        deleteBlog,
        resetBlog,
        updateBlog,
        sortedBlogs,
        writeWithAi,
        comment,
        postComment,
        getAllComments,
        comments,
        isCommentLoading,
        deleteComment,
        likedPost,
        checkLikedData,
        unLikePost,
        likePost,
        isLikesLoading
    }
})
