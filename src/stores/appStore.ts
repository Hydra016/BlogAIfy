import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore';

export const useAppStore = defineStore('appStore', () => {
  const userStore = useUserStore();
  const modalOpened = ref(false);
  const modalComponent = ref<null | string>(null);
  const modalBlogId = ref<string | undefined>('');
  const menuOpened = ref<boolean>(false);

  const url = location.href;
  const match = url.match(/[^/]+$/);
  const lastSegment = match ? match[0] : null;
  const selectedPage = ref(lastSegment);


  const setSelectedPage = (val: string) => {
    selectedPage.value = val
  }

  const setModalOpened = (val: boolean, componentName?: string, id?: string) => {
    modalOpened.value = val;
    modalComponent.value = componentName || null;
    modalBlogId.value = id;

    if (!val) {
      userStore.authMsg = '';
      userStore.showPassword = false;
      userStore.user.name = '';
      userStore.user.email = '';
      userStore.user.password = '';
      modalBlogId.value = '';
    }
  }

  const setOpenMenu = (val: boolean) => {
    menuOpened.value = val;

    const body = document.querySelector('body');
    if (body) {
      body.style.overflowY = menuOpened.value ? 'hidden' : 'scroll';
    }

  }

  return { selectedPage, setSelectedPage, modalOpened, setModalOpened, modalComponent, modalBlogId, setOpenMenu, menuOpened }
})
