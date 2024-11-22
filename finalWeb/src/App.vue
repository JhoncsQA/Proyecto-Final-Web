<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/cuaderno.png" width="125" height="125" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/home">Inventario</RouterLink>
        <RouterLink to="/about">Gestión de Usuarios</RouterLink>
        <RouterLink to="/">login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Estilo global para el header y el logo */
header {
  line-height: 1.5;
  max-height: 20vh;
  background-color: #f8f9fa; /* Fondo sutil para el encabezado */
  padding: 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  transition: transform 0.3s ease; /* Animación sutil para el logo */
}

.logo:hover {
  transform: scale(1.1); /* Efecto de agrandar el logo al pasar el ratón */
}

/* Estilo para el contenedor de navegación */
.wrapper {
  display: flex;
  justify-content: center;
}

/* Estilo para la barra de navegación */
nav {
  display: flex;
  justify-content: center;
  gap: 2rem; /* Espaciado entre los enlaces */
  width: 100%;
  font-size: 14px; /* Tamaño de fuente más grande y legible */
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 10px 15px;
  text-decoration: none;
  color: #333; /* Color base de los enlaces */
  font-weight: 500; /* Fuente un poco más gruesa para mayor contraste */
  border-radius: 6px; /* Bordes redondeados */
  transition: background-color 0.3s, transform 0.2s ease; /* Transiciones suaves */
}

nav a:hover {
  background-color: #007bff; /* Fondo azul para el hover */
  color: white; /* Color de texto blanco */
  transform: translateY(-3px); /* Efecto de elevar el enlace */
}

nav a.router-link-exact-active {
  background-color: #007bff; /* Fondo azul cuando el enlace está activo */
  color: white; /* Texto blanco cuando está activo */
}

nav a.router-link-exact-active:hover {
  background-color: #0056b3; /* Cambio de color al pasar el ratón cuando está activo */
  transform: none; /* El enlace activo no se eleva al pasar el ratón */
}

/* Estilo para pantallas grandes (a partir de 1024px) */
@media (min-width: 1024px) {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: 0;
    font-size: 16px;
    padding: 0.8rem 1rem;
  }
}
</style>

