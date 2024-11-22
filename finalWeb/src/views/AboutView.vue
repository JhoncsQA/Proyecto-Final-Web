<template>
  <div class="clientes">
    <h1>Gestión de Clientes</h1>

    <!-- Formulario para agregar o editar cliente -->
    <div class="client-form">
      <h2>{{ editClient ? 'Editar Cliente' : 'Registrar Cliente' }}</h2>
      
      <form @submit.prevent="saveClient">
        <div class="form-group">
          <label for="client-name">Nombre</label>
          <input 
            id="client-name" 
            v-model="newClient.name" 
            type="text" 
            placeholder="Nombre completo" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="client-email">Correo electrónico</label>
          <input 
            id="client-email" 
            v-model="newClient.email" 
            type="email" 
            placeholder="Correo electrónico" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="client-phone">Teléfono</label>
          <input 
            id="client-phone" 
            v-model="newClient.phone" 
            type="text" 
            placeholder="Teléfono" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="client-address">Dirección</label>
          <input 
            id="client-address" 
            v-model="newClient.address" 
            type="text" 
            placeholder="Dirección" 
            required 
          />
        </div>

        <button type="submit" class="btn-primary">
          {{ editClient ? 'Guardar Cambios' : 'Registrar Cliente' }}
        </button>
      </form>
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
            <button @click="startEditing(client)" class="btn-secondary">Editar</button>
            <button @click="deleteClient(client.id)" class="btn-danger">Eliminar</button>
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
    margin: 30px auto;
    max-width: 1200px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    color: #333;
    font-weight: 600;
    margin-bottom: 30px;
  }
  

  .client-form {
    margin-bottom: 30px;
    padding: 25px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  .client-form h2 {
    margin-bottom: 15px;
    color: #333;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    font-size: 14px;
    color: #555;
  }

  .form-group input {
    width: 100%;
    padding: 12px 15px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .form-group input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  }

  button {
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background-color: #007BFF;
    color: white;
    border: none;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  .btn-secondary {
    background-color: #28a745;
    color: white;
    border: none;
  }

  .btn-secondary:hover {
    background-color: #218838;
  }

  .btn-danger {
    background-color: #dc3545;
    color: white;
    border: none;
  }

  .btn-danger:hover {
    background-color: #c82333;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 30px;
  }

  table th, table td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ffffff;
    font-size: 14px;
  }

  table th {
    background-color: #f7f7f7;
    color: #333;
  }

  table td {
    color: #555;
  }

  table tr:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 768px) {
    .clientes {
      margin: 20px;
      padding: 15px;
    }

    .client-form {
      padding: 20px;
    }

    table th, table td {
      font-size: 12px;
    }
  }
</style>
