<template>
  <div class="inventory">
    <h1>Inventario Papelería</h1>

    <!-- Formulario para agregar producto -->
    <div class="product-form">
      <h2>Agregar Producto</h2>
      <label for="product-name">Nombre del producto</label>
      <input 
        id="product-name" 
        v-model="newProduct.name" 
        type="text" 
        placeholder="Nombre del producto" 
        name="product-name" 
      />
      
      <label for="product-price">Precio</label>
      <input 
        id="product-price" 
        v-model.number="newProduct.price" 
        type="number" 
        placeholder="Precio" 
        name="product-price" 
      />
      
      <label for="product-quantity">Cantidad</label>
      <input 
        id="product-quantity" 
        v-model.number="newProduct.quantity" 
        type="number" 
        placeholder="Cantidad" 
        name="product-quantity" 
      />
      
      <button @click="addProduct">Agregar</button>
    </div>

    <!-- Listar productos -->
    <h2>Lista de Productos</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button @click="startEditing(product)">Editar</button>
            <button @click="deleteProduct(product.id)">Eliminar</button>
            <button @click="startSale(product)">Vender</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para editar producto -->
    <div v-if="editProduct" class="product-form">
      <h2>Editar Producto</h2>
      <input v-model="editProduct.name" placeholder="Nombre del producto" />
      <input v-model.number="editProduct.price" type="number" placeholder="Precio" />
      <input v-model.number="editProduct.quantity" type="number" placeholder="Cantidad" />
      <button @click="saveEdit">Guardar Cambios</button>
    </div>

    <!-- Formulario para venta -->
    <div v-if="saleProduct" class="product-form">
      <h2>Realizar Venta</h2>
      <p>Producto: {{ saleProduct.name }}</p>
      <input v-model.number="saleQuantity" type="number" placeholder="Cantidad a vender" min="1" />
      <button @click="processSale">Vender</button>
    </div>

    <!-- Historial de ventas -->
    <h2>Historial de Ventas</h2>
    <ul>
      <li v-for="(sale, index) in salesHistory" :key="index">{{ sale }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const products = ref<any[]>([]);
    const newProduct = ref({ name: '', price: 0, quantity: 0 });
    const editProduct = ref<any | null>(null);
    const saleProduct = ref<any | null>(null); // Producto seleccionado para venta
    const saleQuantity = ref(1); // Cantidad que se va a vender
    const salesHistory = ref<string[]>([]); // Historial de ventas

    // Cargar productos desde localStorage (simula un archivo JSON)
    const loadProducts = () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        products.value = JSON.parse(storedProducts);
      }
    };

    // Cargar historial de ventas desde localStorage
    const loadSalesHistory = () => {
      const storedSalesHistory = localStorage.getItem('salesHistory');
      if (storedSalesHistory) {
        salesHistory.value = JSON.parse(storedSalesHistory);
      }
    };

    // Guardar productos en localStorage
    const saveProducts = () => {
      localStorage.setItem('products', JSON.stringify(products.value));
    };

    // Guardar historial de ventas en localStorage
    const saveSalesHistory = () => {
      localStorage.setItem('salesHistory', JSON.stringify(salesHistory.value));
    };

    // Agregar un producto
    const addProduct = () => {
      const newId = products.value.length > 0 ? products.value[products.value.length - 1].id + 1 : 1;
      const product = { ...newProduct.value, id: newId };
      products.value.push(product);
      saveProducts(); // Guardar después de agregar
      newProduct.value = { name: '', price: 0, quantity: 0 }; // Limpiar el formulario
    };

    // Editar un producto
    const startEditing = (product: any) => {
      editProduct.value = { ...product }; // Clonar el producto
    };

    const saveEdit = () => {
      const index = products.value.findIndex(p => p.id === editProduct.value.id);
      if (index !== -1) {
        products.value[index] = { ...editProduct.value };
        saveProducts(); // Guardar después de editar
        editProduct.value = null; // Limpiar el formulario
      }
    };

    // Eliminar un producto
    const deleteProduct = (id: number) => {
      products.value = products.value.filter(product => product.id !== id);
      saveProducts(); // Guardar después de eliminar
    };

    // Iniciar la venta de un producto
    const startSale = (product: any) => {
      saleProduct.value = { ...product }; // Clonar el producto
    };

    // Procesar la venta
    const processSale = () => {
      if (saleProduct.value.quantity >= saleQuantity.value) {
        // Descontar la cantidad del inventario
        saleProduct.value.quantity -= saleQuantity.value;

        // Actualizar el producto en el inventario
        const index = products.value.findIndex(p => p.id === saleProduct.value.id);
        if (index !== -1) {
          products.value[index] = { ...saleProduct.value };
          saveProducts(); // Guardar después de realizar la venta
        }

        // Agregar al historial de ventas
        const saleEntry = `Venta de ${saleQuantity.value} unidades de "${saleProduct.value.name}" por $${saleProduct.value.price * saleQuantity.value}`;
        salesHistory.value.push(saleEntry);
        saveSalesHistory(); // Guardar historial de ventas

        // Limpiar el formulario de venta
        saleProduct.value = null;
        saleQuantity.value = 1; // Restablecer la cantidad
      } else {
        alert('No hay suficiente stock para esta venta.');
      }
    };

    onMounted(() => {
      loadProducts(); // Cargar los productos al inicio
      loadSalesHistory(); // Cargar el historial de ventas
    });

    return {
      products,
      newProduct,
      editProduct,
      saleProduct,
      saleQuantity,
      salesHistory,
      addProduct,
      startEditing,
      saveEdit,
      deleteProduct,
      startSale,
      processSale
    };
  }
};
</script>

<style scoped>
  .inventory {
    margin: 20px;
  }

  .product-form {
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

  .product-form input {
    margin-right: 10px;
    padding: 8px;
    width: 200px;
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

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul li {
    padding: 8px;
    background-color: #f9f9f9;
    margin-bottom: 5px;
  }
</style>
