// carrito.js
const app = Vue.createApp({
    data() {
      return {
        items: [
          {
            id: 1,
            name: "",
            brand: "",
            image: "",
            quantity:"", 
            price: "",
          },
         
        ],
      };
    },
    computed: {
      totalItems() {
        return this.items.reduce((total, item) => total + parseInt(item.quantity), 0);
      },
      totalPrice() {
        return this.items.reduce((total, item) => total + item.quantity * item.price, 0);
      },
    },
    methods: {
      formatCurrency(value) {
        
        return "$" + value.toFixed(2);
      },
      removeItem(index) {
        this.items.splice(index, 1);
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
        this.items = cart;
      },
      removeFromCart(index) {
        this.items.splice(index, 1);
        this.saveCart(this.items);
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
  