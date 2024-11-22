<template>
  <div class="inventory">
    <h1>Inventario de Papelería</h1>

    <!-- Formulario para agregar producto -->
    <div class="product-form">
      <h2>Agregar Producto</h2>
      <label for="product-name">Nombre del Producto</label>
      <input 
        id="product-name" 
        v-model="newProduct.name" 
        type="text" 
        placeholder="Nombre del producto" 
        name="product-name"
        required 
      />
      
      <label for="product-price">Precio</label>
      <input 
        id="product-price" 
        v-model.number="newProduct.price" 
        type="number" 
        placeholder="Precio" 
        name="product-price" 
        required 
      />
      
      <label for="product-quantity">Cantidad</label>
      <input 
        id="product-quantity" 
        v-model.number="newProduct.quantity" 
        type="number" 
        placeholder="Cantidad" 
        name="product-quantity" 
        required 
      />
      
      <button @click="addProduct" class="btn primary">Agregar</button>
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
            <button @click="startEditing(product)" class="btn secondary">Editar</button>
            <button @click="deleteProduct(product.id)" class="btn danger">Eliminar</button>
            <button @click="startSale(product)" class="btn primary">Vender</button>
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
      <button @click="saveEdit" class="btn primary">Guardar Cambios</button>
    </div>

    <!-- Formulario para venta -->
    <div v-if="saleProduct" class="product-form">
      <h2>Realizar Venta</h2>
      <p>Producto: {{ saleProduct.name }}</p>
      <input v-model.number="saleQuantity" type="number" placeholder="Cantidad a vender" min="1" />
      <button @click="processSale" class="btn primary">Vender</button>
    </div>

    <!-- Historial de ventas -->
    <h2>Historial de Ventas</h2>
    <table v-if="salesHistory.length > 0">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <!-- Mostrar detalles de cada venta -->
        <tr v-for="(sale, index) in salesHistory" :key="index">
          <td>{{ sale.product }}</td>
          <td>{{ sale.quantity }}</td>
          <td>{{ sale.total | currency }}</td> <!-- Filtro de formato de moneda -->
        </tr>
      </tbody>
    </table>
    <p v-else>No hay ventas registradas.</p>

    <!-- Total de ventas -->
    <h2>Total de Ventas: {{ totalSales | currency }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: {
        name: '',
        price: 0,
        quantity: 0
      },
      products: [],
      editProduct: null,
      saleProduct: null,
      saleQuantity: 1,
      salesHistory: [], // Este es el historial de ventas
    };
  },
  computed: {
    // Calculamos el total de ventas
    totalSales() {
      return this.salesHistory.reduce((total, sale) => {
        return total + sale.total;
      }, 0);
    }
  },
  methods: {
    addProduct() {
      if (this.newProduct.name && this.newProduct.price > 0 && this.newProduct.quantity > 0) {
        this.products.push({
          id: this.products.length + 1,
          ...this.newProduct
        });
        this.newProduct.name = '';
        this.newProduct.price = 0;
        this.newProduct.quantity = 0;
      }
    },
    startEditing(product) {
      this.editProduct = { ...product };
    },
    saveEdit() {
      const index = this.products.findIndex(p => p.id === this.editProduct.id);
      if (index !== -1) {
        this.products.splice(index, 1, this.editProduct);
      }
      this.editProduct = null;
    },
    deleteProduct(id) {
      this.products = this.products.filter(product => product.id !== id);
    },
    startSale(product) {
      if (product.quantity > 0) {
        this.saleProduct = { ...product };
      } else {
        alert('No hay suficiente cantidad para vender');
      }
    },
    processSale() {
      if (this.saleQuantity > 0 && this.saleQuantity <= this.saleProduct.quantity) {
        // Descontar la cantidad vendida del inventario
        this.saleProduct.quantity -= this.saleQuantity;

        // Agregar la venta al historial
        const sale = {
          product: this.saleProduct.name,
          quantity: this.saleQuantity,
          total: this.saleProduct.price * this.saleQuantity
        };
        this.salesHistory.push(sale);

        // Limpiar el formulario de venta
        this.saleProduct = null;
        this.saleQuantity = 1;
      } else {
        alert('Cantidad no válida para la venta');
      }
    }
  },
  filters: {
    // Filtro para mostrar el valor en formato de moneda
    currency(value) {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(value);
    }
  }
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
  }

  

  .inventory {
    margin: 30px auto;
    max-width: 1200px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  h1, h2 {
    color: #333;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .product-form {
    margin-bottom: 30px;
    background-color: #fff;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    font-size: 15px;
  }

  .product-form input {
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 18px;
    border-radius: 6px;
    border: 1px solid #d0d0d0;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .product-form input:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  }

  .btn {
    padding: 12px 25px;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn.primary {
    background-color: #007BFF;
    color: white;
    border: none;
  }

  .btn.primary:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  .btn.secondary {
    background-color: #28a745;
    color: white;
    border: none;
  }

  .btn.secondary:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  .btn.danger {
    background-color: #dc3545;
    color: white;
    border: none;
  }

  .btn.danger:hover {
    background-color: #c82333;
    transform: scale(1.05);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  table th, table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    font-size: 14px;
  }

  table th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
  }

  table td {
    color: #555;
  }

  table tr:hover {
    background-color: #f7f7f7;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul li {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 12px;
    border-radius: 6px;
    font-size: 14px;
    border: 1px solid #e0e0e0;
  }

  @media (max-width: 768px) {
    .inventory {
      margin: 20px;
      padding: 20px;
    }

    .product-form {
      padding: 20px;
    }

    table {
      font-size: 12px;
    }

    table th, table td {
      padding: 10px;
    }
  }
</style>
