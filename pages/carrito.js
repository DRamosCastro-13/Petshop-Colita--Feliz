const url = 'https://moviestack.onrender.com/api/petshop';

const { createApp } = Vue;
const app = createApp({
    data() {
      return {
        data : [],
        estaEnCarrito: false,
        id: '',
        carritoPrint: [],
        items: [
          {
            _id: "",
            name: "",
            brand: "",
            image: "",
            quantity:"", 
            price: "",
          },
         
        ],
      };
    },
    beforeCreate() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
               this.data = data;
               console.log(this.items)
               this.id = this.data.map(data => data._id)
               this.estaEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
               this.carritoPrint = this.estaEnCarrito.map(item => this.data.find(product => product._id == item));

               console.log(this.carritoPrint)

            })
            .catch(error => console.log(error));
    },
    computed: {
      totalItems() {
        return this.estaEnCarrito.reduce((total, item) => total + parseInt(item.quantity), 0);
      },
      totalPrice(item) {
        for(let i = 0; i < this.estaEnCarrito.length; i++){
          return this.estaEnCarrito[i].price
        }
        
      },
      total() {
        return this.estaEnCarrito.reduce((total, producto) => total + producto.precio, 0);
      }
    },
    methods: {
      formatCurrency(value) {
        
        return "$" + Number(value).toFixed(2);

      },
      removeItem(index) {
        this.estaEnCarrito.splice(index, 1);
      },
      addToCart(product) {
        const cart = this.getCart();
        const existingProduct = cart.find(item => item.id === product.id);
  
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            image: product.image,
            quantity: 1,
            price: product.price,
          });
        }
  
        this.saveCart(cart);
      },
      updateCart() {
        const cart = this.getCart();
        this.estaEnCarrito = cart;
      },
      removeFromCart(index) {
        this.estaEnCarrito.splice(index, 1);
        this.saveCart(this.estaEnCarrito);
      },
      saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
      },
      getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
      },
    },
    mounted() {
      this.updateCart();
    },
  });
  
  app.mount("#cart-app");
  
