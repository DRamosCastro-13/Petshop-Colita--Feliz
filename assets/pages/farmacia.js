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
            })
            .catch(error => console.log(error))
    },
    methods: {
        showModal(producto) {
            this.produfarmacia = producto;
            this.modalVisible = true;
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