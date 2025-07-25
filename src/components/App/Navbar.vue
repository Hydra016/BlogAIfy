<template>
    <div>
        <nav class="flex justify-between items-center gap-40 md:px-0 px-5">
            <div class="nav-img">
                <RouterLink to="/">
                    <img class="md:w-40 w-[120px]" src="@/assets/Logo.png" />
                </RouterLink>
            </div>
            <div class="flex-1 justify-between md:flex hidden">
                <div class="flex gap-5 items-center">
                    <NavbarLink :page="'home'" />
                    <NavbarLink :page="'about'" />
                    <NavbarLink v-if="userStore.isAuthenticated" :page="'my-posts'" />
                </div>
                <div v-if="userStore.isAuthenticated" class="flex gap-2 items-center">
                    <div @click="appStore.setSelectedPage('create')" class="mr-5 hover:text-white text-[#7E7E81]">
                        <NavbarLink :page="'create'">
                            <i class="pi pi-plus-circle cursor-pointer" style="font-size: 1rem"></i>
                        </NavbarLink>
                    </div>
                    <RouterLink @click="appStore.setModalOpened(true, 'SignoutModal')"
                        class="bg-[#FFD11A] text-[#141414] px-10 py-2 rounded-lg cursor-pointer" to="/">
                        Signout
                    </RouterLink>
                </div>

                <div v-else class="flex gap-2 items-center">
                    <div @click="appStore.setModalOpened(true, 'Login')"
                        class="bg-[#FFD11A] text-[#141414] px-10 py-2 rounded-lg cursor-pointer">Signin</div>
                    <div @click="appStore.setModalOpened(true, 'Register')"
                        class="bg-[#FFD11A] text-[#141414] px-10 py-2 rounded-lg cursor-pointer">Register</div>
                </div>
            </div>
            <div class="block md:hidden" @click="appStore.setOpenMenu(!appStore.menuOpened)">
                <i class="pi pi-bars" v-if="!appStore.menuOpened"></i>
                <i class="pi pi-times" v-else></i>
            </div>
        </nav>
        <div v-if="appStore.menuOpened">
            <Menu />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { useUserStore } from '@/stores/userStore';
import { onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import Menu from './Menu.vue';
import NavbarLink from './NavbarLink.vue';

const appStore = useAppStore();
const userStore = useUserStore();

onMounted(() => {
    userStore.checkAuthToken();
});
</script>

<style scoped></style>