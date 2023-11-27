const url = 'https://moviestack.onrender.com/api/petshop';

const { createApp, ref } = Vue;

// Crea una referencia para el bus de eventos
const eventBus = ref(null);

const app = createApp({
  data() {
    return {
      petshop: [],
      carrito: [],
      categorias: [],
      modalVisible: false,
      prodJugeteria: {
        categoria: '',
        descripcion: '',
        disponibles: '',
        imagen: '',
        precio: '',
        producto: '',
      },
    };
  },
  beforeCreate() {
    // Establece el bus de eventos
    eventBus.value = this;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.petshop = data;
        console.log(this.petshop);
        this.categorias = [...new Set(this.petshop.filter(producto => producto.categoria === 'jugueteria'))];
        console.log(this.categorias);
      })
      .catch(error => console.log(error));
  },
  computed: {
    disponibilidad() {
      return this.prodJugeteria.disponibles < 5 ? '¡Últimas unidades!' : '';
    },
  },
  methods: {
    agregarAlCarrito(producto) {
      const productoEnCarrito = this.carrito.find(item => item.id === producto.id);

      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
      } else {
        this.carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        });
      }
      console.log('Carrito:', this.carrito);
      // Emite un evento personalizado para notificar al carrito
      eventBus.value.$emit('producto-agregado-al-carrito', producto);
    },
    showModal(producto) {
      this.prodJugeteria = producto;
      this.modalVisible = true;
    },
    cerrarModal() {
      this.prodJugeteria = {
        categoria: '',
        descripcion: '',
        disponibles: '',
        imagen: '',
        precio: '',
        producto: '',
      };
      this.modalVisible = false;
    },
  },
});

console.log('inicio');
app.mount("#app");
console.log('final');
