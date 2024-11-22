<template>
  <div class="login">
    <div class="form-container">
      <h1>Iniciar sesión</h1>
      <div class="input-group">
        <label for="user">Usuario</label>
        <input type="text" v-model="user" placeholder="Introduce tu usuario" />
      </div>
      <div class="input-group">
        <label for="pass">Contraseña</label>
        <input type="password" v-model="pass" placeholder="Introduce tu contraseña" />
      </div>
      <button @click="handleLogin">Iniciar Sesión</button>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const user = ref('');
    const pass = ref('');
    const errorMessage = ref('');
    const authStore = useAuthStore();

    const handleLogin = () => {
      const success = authStore.login(user.value, pass.value); // Llamada al store pasando las credenciales

      if (success) {
        router.push('/home'); 
      } else {
        errorMessage.value = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    };

    return {
      user,
      pass,
      errorMessage,
      handleLogin
    };
  }
});
</script>

<style scoped>
/* Estilos generales del formulario */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f7f7f7;
}

/* Contenedor principal con imagen de fondo */
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/papeleria.jpg'); /* Ruta de la imagen de fondo */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Contenedor del formulario */
.form-container {
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco translúcido */
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
}

h1 {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

/* Estilos de los inputs y labels */
.input-group {
  margin-bottom: 20px;
  text-align: left;
  position: relative;
}

.input-group label {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  display: block;
}

.input-group input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #4d56c5;
  box-shadow: 0 0 8px rgba(77, 86, 197, 0.4);
}

/* Estilo del botón */
button {
  background-color: #4d56c5;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3c46a5;
}

/* Mensaje de error */
.error-message {
  color: #f44336;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
}

/* Responsividad */
@media (max-width: 480px) {
  .form-container {
    padding: 25px;
  }

  h1 {
    font-size: 22px;
  }

  .input-group input {
    font-size: 14px;
  }

  button {
    font-size: 14px;
  }
}
</style>
