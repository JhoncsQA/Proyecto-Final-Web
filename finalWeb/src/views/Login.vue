<template>
  <div class="login">
    <div class="form-container">
      <div class="input-group">
        <label for="user">Usuario</label>
        <input type="text" v-model="user" placeholder="Introduce tu usuario" />
      </div>
      <div class="input-group">
        <label for="pass">Contraseña</label>
        <input type="password" v-model="pass" placeholder="Introduce tu contraseña" />
      </div>
      <button @click="handleLogin">Iniciar Sesión</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Asegúrate de que la ruta sea correcta

export default defineComponent({
  setup() {
    const user = ref('');
    const pass = ref('');
    const authStore = useAuthStore();

    const handleLogin = () => {
      const success = authStore.login(user.value, pass.value); // Llamada al store pasando las credenciales

      if (success) {
        alert('Inicio de sesión exitoso');
      } else {
        authStore.logout
        alert('Credenciales incorrectas');
        
      }
    };

    return {
      user,
      pass,
      handleLogin
    };
  }
});
</script>

<style scoped>
/* Contenedor principal */
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background: #f0f0f0;
  font-family: 'Arial', sans-serif;
}

/* Contenedor del formulario */
.form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Título del formulario */
h1 {
  color: #333;
  margin-bottom: 20px;
}

/* Estilos de los inputs y labels */
.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

.input-group input:focus {
  border-color: #007BFF;
}

/* Estilo del botón */
button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}

/* Responsividad */
@media (max-width: 480px) {
  .form-container {
    padding: 15px;
  }

  h1 {
    font-size: 24px;
  }

  .input-group input {
    font-size: 14px;
  }

  button {
    font-size: 14px;
  }
}
</style>
