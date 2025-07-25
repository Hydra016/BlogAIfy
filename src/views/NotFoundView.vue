<template>
    <div class="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <i class="pi pi-exclamation-triangle text-yellow-500 text-6xl mb-4"></i>
        <h1 class="text-4xl font-bold text-gray-500 mb-2">404 - Page Not Found</h1>
        <p class="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <router-link to="/"
            class="inline-flex items-center px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition duration-200">
            <i class="pi pi-home mr-2"></i> Back to Home
        </router-link>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>