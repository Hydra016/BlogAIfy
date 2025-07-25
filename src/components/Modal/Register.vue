<template>
    <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div class="bg-[#121212] text-white p-8 rounded-lg w-full max-w-md shadow-[0_0_0_1px_#2a2a2a]">
            <h2 class="text-2xl font-semibold mb-6">Create an Account</h2>

            <form class="flex flex-col gap-5">
                <div class="flex flex-col gap-2">
                    <label for="name" class="text-sm text-gray-400">Full Name<span
                            class="text-red-500 ml-1">*</span></label>
                    <input id="name" type="text" required placeholder="Enter your name" v-model="userStore.user.name"
                        class="w-full bg-[#1e1e1e] text-white px-4 py-2 rounded-md placeholder:text-gray-500 border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#FFD11A]" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="email" class="text-sm text-gray-400">Email<span
                            class="text-red-500 ml-1">*</span></label>
                    <input id="email" type="email" required placeholder="you@example.com" v-model="userStore.user.email"
                        class="w-full bg-[#1e1e1e] text-white px-4 py-2 rounded-md placeholder:text-gray-500 border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#FFD11A]" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="password" class="text-sm text-gray-400">Password<span
                            class="text-red-500 ml-1">*</span></label>
                    <div
                        class="flex items-center bg-[#1e1e1e] border border-[#2a2a2a] rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-[#FFD11A]">
                        <input id="password" :type="userStore.showPassword ? 'text' : 'password'" required
                            placeholder="••••••••" v-model="userStore.user.password"
                            class="w-full bg-transparent text-white placeholder:text-gray-500 outline-none" />
                        <i @click="userStore.setShowPassword"
                            :class="userStore.showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                            class="text-gray-500 hover:text-white cursor-pointer ml-3" style="font-size: 1rem"></i>
                    </div>
                </div>
            </form>

            <span v-if="userStore.authMsg"
                class="text-red-400 bg-[#2a1e1e] px-4 py-2 text-sm rounded-md mt-4 block border border-red-500/20">
                {{ userStore.authMsg }}
            </span>

            <div class="flex justify-end gap-4 mt-6">
                <button @click="() => { userStore.signUp(); appStore.setOpenMenu(); }"
                    class="border border-[#FFD11A] text-[#FFD11A] px-6 py-2 rounded-md font-medium hover:bg-[#FFD11A] hover:text-black transition">
                    Sign Up
                </button>

                <button @click="appStore.setModalOpened(false)"
                    class="bg-[#FFD11A] text-[#141414] px-6 py-2 rounded-md font-medium hover:opacity-90 transition">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { useUserStore } from '@/stores/userStore';

const appStore = useAppStore();
const userStore = useUserStore();
</script>

<style scoped></style>