<template>
    <div class="absolute top-20 z-10 w-screen bg-[#1e1e1e] h-screen px-8 py-10 space-y-6 text-white text-lg">
        <RouterLink @click="appStore.setOpenMenu(false)" to="/" class="block hover:text-[#FFD11A] transition">Home
        </RouterLink>
        <RouterLink @click="appStore.setOpenMenu(false)" to="/contact" class="block hover:text-[#FFD11A] transition">
            Contact</RouterLink>
        <RouterLink @click="appStore.setOpenMenu(false)" to="/about" class="block hover:text-[#FFD11A] transition">
            About</RouterLink>

        <div class="space-y-6" v-if="userStore.isAuthenticated">
            <RouterLink @click="appStore.setOpenMenu(false)" to="/my-posts"
                class="block hover:text-[#FFD11A] transition">My
                Posts</RouterLink>
            <RouterLink @click="appStore.setOpenMenu(false)" to="/create"
                class="block hover:text-[#FFD11A] transition flex items-center gap-2">
                <i class="pi pi-plus-circle" style="font-size: 1rem"></i>
                Create
            </RouterLink>
            <RouterLink @click="appStore.setOpenMenu(false)" to="/" @click.prevent="userStore.signOutUser"
                class="block bg-[#FFD11A] text-[#141414] text-center rounded-md py-2 mt-4">
                Signout
            </RouterLink>
        </div>

        <div v-else class="space-y-4">
            <div @click="appStore.setModalOpened(true, 'Login')"
                class="block bg-[#FFD11A] text-[#141414] text-center rounded-md py-2 cursor-pointer">
                Signin
            </div>
            <div @click="appStore.setModalOpened(true, 'Register')"
                class="block bg-[#FFD11A] text-[#141414] text-center rounded-md py-2 cursor-pointer">
                Register
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useAppStore } from '@/stores/appStore'

const userStore = useUserStore()
const appStore = useAppStore()
</script>
