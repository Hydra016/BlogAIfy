import { ref, computed, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'
import supabase from '@/supabase'
import { useAppStore } from './appStore';

type User = {
  name: string;
  email: string;
  password: string;
}

export const useUserStore = defineStore('userStore', () => {
  const user = reactive<User>({
    name: '',
    email: '',
    password: ''
  });

  const userId = ref('')
  const userMetadata = reactive({
    email: '',
    email_verified: false,
    full_name: '',
    phone_verified: false,
    sub: ''
  });

  const appStore = useAppStore();



  // const isAuthenticatedNew = ref<boolean>();
  const isAuthenticated = ref<boolean>(false);
  const authMsg = ref('');
  const showPassword = ref<boolean>(false);

  const setShowPassword = () => {
    showPassword.value = !showPassword.value
  };

  const checkAuthToken = () => {
    const hasAuthToken = Object.keys(localStorage).some(key =>
      key.includes('auth-token') && localStorage.getItem(key)
    );
    isAuthenticated.value = hasAuthToken;
    const correctKey = Object.keys(localStorage).find(key =>
      key.includes('auth-token') && localStorage.getItem(key)
    )

    const item = correctKey && localStorage.getItem(correctKey)
    const parsed = item ? JSON.parse(item) : null
    userId.value = item && JSON.parse(item)?.user?.id
    if (parsed?.user?.user_metadata) {
      Object.assign(userMetadata, parsed.user.user_metadata)
    }
  };

  const signUp = async () => {
    const { email, password, name } = user;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });
      user.email = '';
      user.password = '';
      user.name = '';

      if (data.user) {
        authMsg.value = 'A confirmation email has been sent to your inbox';
      }

      if (error) {
        authMsg.value = error.message;
      }
    } catch (error) {
      throw new Error("Failed to sign up");
    }
  }

  const signInUser = async () => {
    const { email, password, name } = user;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });


      if (error) {
        authMsg.value = error.message;
      }

      // if (data.user && !data.user.confirmed_at) {
      //   return {
      //     data: null,
      //     error: { message: "Please confirm your email before signing in" },
      //   };
      // }

      if (data.user) {
        // localStorage.setItem('authenticated', JSON.stringify(true))
        localStorage.setItem('authenticated', JSON.stringify(data.user.id))
        userId.value = data.user.id
        isAuthenticated.value = true;
        appStore.setModalOpened(false);
      }

    } catch (error) {
      throw new Error("Failed to sign in");
    }
  }

  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);

      Object.keys(localStorage).forEach(key => {
        if (key.includes('auth-token')) {
          localStorage.removeItem(key);
        }
      });
      isAuthenticated.value = false;

      return null;
    } catch (error) {
      throw new Error("Failed to sign out");
    }
  };

  return { user, isAuthenticated, signUp, signInUser, authMsg, signOutUser, showPassword, setShowPassword, userId, userMetadata, checkAuthToken }
})
