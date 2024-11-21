<template>
  <div class="clientes">
    <h1>Gestión de Clientes</h1>

    <!-- Formulario para agregar o editar cliente -->
    <div class="client-form">
      <h2>{{ editClient ? 'Editar Cliente' : 'Registrar Cliente' }}</h2>
      <label for="client-name">Nombre</label>
      <input 
        id="client-name" 
        v-model="newClient.name" 
        type="text" 
        placeholder="Nombre completo" 
        name="client-name" 
      />
      
      <label for="client-email">Correo electrónico</label>
      <input 
        id="client-email" 
        v-model="newClient.email" 
        type="email" 
        placeholder="Correo electrónico" 
        name="client-email" 
      />
      
      <label for="client-phone">Teléfono</label>
      <input 
        id="client-phone" 
        v-model="newClient.phone" 
        type="text" 
        placeholder="Teléfono" 
        name="client-phone" 
      />
      
      <label for="client-address">Dirección</label>
      <input 
        id="client-address" 
        v-model="newClient.address" 
        type="text" 
        placeholder="Dirección" 
        name="client-address" 
      />
      
      <button @click="saveClient">{{ editClient ? 'Guardar Cambios' : 'Registrar Cliente' }}</button>
    </div>

    <!-- Listar clientes -->
    <h2>Lista de Clientes</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.id }}</td>
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.address }}</td>
          <td>
            <button @click="startEditing(client)">Editar</button>
            <button @click="deleteClient(client.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const clients = ref<any[]>([]);
    const newClient = ref({ name: '', email: '', phone: '', address: '' });
    const editClient = ref<any | null>(null); // Cliente seleccionado para editar

    // Cargar clientes desde localStorage (simula un archivo JSON)
    const loadClients = () => {
      const storedClients = localStorage.getItem('clients');
      if (storedClients) {
        clients.value = JSON.parse(storedClients);
      }
    };

    // Guardar clientes en localStorage
    const saveClients = () => {
      localStorage.setItem('clients', JSON.stringify(clients.value));
    };

    // Registrar o editar cliente
    const saveClient = () => {
      if (editClient.value) {
        // Editar cliente existente
        const index = clients.value.findIndex(c => c.id === editClient.value.id);
        if (index !== -1) {
          clients.value[index] = { ...newClient.value };
          saveClients(); // Guardar después de editar
        }
      } else {
        // Registrar nuevo cliente
        const newId = clients.value.length > 0 ? clients.value[clients.value.length - 1].id + 1 : 1;
        const client = { ...newClient.value, id: newId };
        clients.value.push(client);
        saveClients(); // Guardar después de agregar
      }
      resetForm(); // Limpiar formulario después de guardar
    };

    // Iniciar la edición de un cliente
    const startEditing = (client: any) => {
      newClient.value = { ...client }; // Clonar cliente
      editClient.value = { ...client }; // Marcar como cliente en edición
    };

    // Eliminar cliente
    const deleteClient = (id: number) => {
      clients.value = clients.value.filter(client => client.id !== id);
      saveClients(); // Guardar después de eliminar
    };

    // Restablecer formulario
    const resetForm = () => {
      newClient.value = { name: '', email: '', phone: '', address: '' };
      editClient.value = null;
    };

    onMounted(() => {
      loadClients(); // Cargar los clientes al inicio
    });

    return {
      clients,
      newClient,
      editClient,
      saveClient,
      startEditing,
      deleteClient,
    };
  }
};
</script>

<style scoped>
  .clientes {
    margin: 20px;
  }

  .client-form {
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  table th, table td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }

  .client-form input {
    margin-right: 10px;
    padding: 8px;
    width: 250px;
  }

  button {
    padding: 8px 16px;
    cursor: pointer;
    background-color: #007BFF;
    color: white;
    border: none;
  }

  button:hover {
    background-color: #007BFF;
  }
</style>
