import { defineStore } from 'pinia';

interface User {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Corregido: verificar si el valor almacenado es 'true'
    loggedIn: localStorage.getItem('loggedIn') === 'true',  
    users: [
      { username: 'admin', password: '2024' }
    ] as User[]
  }),

  actions: {
    login(user: string, pass: string): boolean {
      const validUser = this.users.find(
        (u) => u.username === user && u.password === pass
      );

      if (validUser) {
        this.loggedIn = true;
        localStorage.setItem('loggedIn', 'true'); // Persistir estado
        return true;
      } else {
        localStorage.setItem('loggedIn', 'false');
        return false;
      }
    },
  }
});
