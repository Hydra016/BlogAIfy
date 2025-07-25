<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/App/Navbar.vue'
import 'primeicons/primeicons.css'
import Modal from './components/Modal/Modal.vue';
import Login from './components/Modal/Login.vue';
import Footer from './components/App/Footer.vue';
</script>

<template>
  <div class="md:max-w-[1400px] mx-auto mt-5 min-h-screen flex flex-col bg-[#1e1e1e]">
    <Navbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <Modal />
  </div>
</template>

<style scoped></style>
