<template>
    <div v-show="store.modalOpened" class="modal-backdrop">
        <div class="modal">
            <component :is="modalComponent" v-if="modalComponent" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { computed } from 'vue';
import Login from '../Modal/Login.vue';
import Register from '../Modal/Register.vue';
import BlogSubmit from '../Modal/BlogSubmit.vue';
import DeleteModal from './DeleteModal.vue';
import EditModal from './EditModal.vue';
import SignoutModal from './SignoutModal.vue';

const store = useAppStore();
const components: any = { Login, Register, BlogSubmit, DeleteModal, EditModal, SignoutModal };
const modalComponent = computed(() => {
    return store.modalComponent ? components[store.modalComponent] : null;
});
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    padding: 1rem;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.close-button {
    margin-top: 1rem;
    padding: 0.5rem 1.2rem;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.close-button:hover {
    background-color: #555;
}
</style>
