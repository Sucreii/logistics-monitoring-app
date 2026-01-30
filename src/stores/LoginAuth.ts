import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { HTTP_API } from 'src/boot/axios';

type CredentialsType = {
  username: string;
  password: string;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: Cookies.get('username') || (null as string | null),
    role: Cookies.get('role') || null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.username,
    roleLabel: (state) => {
      const roles: Record<number, string> = {
        1: 'Super Admin',
        2: 'Admin',
        3: 'Worker',
        4: 'Viewer',
      };

      return roles[Number(state.role)] || 'Unknown Role';
    },
  },

  actions: {
    async login(payload: CredentialsType) {
      this.loading = true;
      try {
        const response = await HTTP_API().post('/auth/login', payload);
        this.username = response.data.user;
        this.role = response.data.user.role;
        console.log('I AM LOGIN: ', response.data.user.first_name);

        Cookies.set('username', this.username as string, { path: '/', expires: 7 });
        Cookies.set('role', this.role as string, { path: '/', expires: 7 });

        return response.data;
      } catch (err) {
        console.error('Login Error:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.username = null;
      this.role = null;
      Cookies.remove('username');
      Cookies.remove('role');

      await this.router.push({ name: 'auth.page' });
    },
  },
});
