const url = 'https://moviestack.onrender.com/api/petshop'

console.log("inicio")

const { createApp } = Vue

const optionsVue = {
    data() {
        return {
            petshop: [],
            categorias: [],
            farmacia: [],
            jugueteria: [],
            modalVisible: false,
            estaEnCarrito: false,
            id: '',
            produfarmacia: {
                categoria: '',
                descripcion: '',
                disponibles: '',
                imagen: '',
                precio: '',
                producto: '',
            }

        }
    },
    beforeCreate() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.petshop = data
                console.log("petshop", this.petshop)
                this.categorias = [...new Set(this.petshop.flatMap(petshop => petshop.categoria))].sort()
                console.log("categorias", this.categorias)
                this.farmacia = this.petshop.filter(petshop => petshop.categoria == "farmacia")
                console.log("farmacia", this.farmacia)
                this.id = this.petshop.map(petshop => petshop._id)
                console.log('this.id', this.id)
                this.estaEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
                
            })
            .catch(error => console.log(error))
    },
    methods: {
        showModal(producto) {
            this.produfarmacia = producto;
            this.modalVisible = true;
        },
        agregarAlCarrito(id) {
            //const productoEnCarrito = this.carrito.find(item => item.id === producto.id);
      
            if (this.estaEnCarrito.includes(id)) {
                this.estaEnCarrito.splice(this.estaEnCarrito.indexOf(id), 1);
            } else {
              this.estaEnCarrito.push(id);
                /*{
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1,
              }*/
            }
            // Emite un evento personalizado para notificar al carrito
            localStorage.setItem('carrito', JSON.stringify(this.estaEnCarrito));
          },
        cerrarModal() {
            this.produfarmacia = {
                categoria: '',
                descripcion: '',
                disponibles: '',
                imagen: '',
                precio: '',
                producto: '',
            },
                this.modalVisible = false;
        },
    }
}
console.log("final")
const app = createApp(optionsVue)
app.mount("#app")