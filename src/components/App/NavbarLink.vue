<template>
    <div @click="appStore.setSelectedPage(props.page)">
        <RouterLink class="text-[#7E7E81] hover:text-white duration-300 ease-in-out capitalize flex items-center gap-2"
            :class="{ selected: appStore.selectedPage === props.page }" :to="'/' + props.page">{{ formattedPage }}
            <slot />
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';

const props = defineProps(['page']);
const appStore = useAppStore();

const formattedPage = computed(() => props.page.replace(/-/g, ' '));
</script>

<style scoped>
.selected {
    color: white;
}
</style>