const url = 'https://moviestack.onrender.com/api/petshop'

console.log("inicio")

const { createApp } = Vue

const optionsVue = {
    data() {
        return {
            petshop: [],
            categorias: [],
            modalVisible: false,
            prodJugeteria: {
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
                console.log(this.petshop)
                this.categorias = [...new Set(this.petshop.filter(producto => producto.categoria === 'jugueteria'))]
                console.log(this.categorias)
            })
            .catch(error => console.log(error))
    },
    computed: {
        disponibilidad() {
            return this.prodJugeteria.disponibles < 5 ? '¡Últimas unidades!' : '';
        }
    },
    methods: {
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
            },
                this.modalVisible = false;
        },
    }
}
console.log("final")
const app = createApp(optionsVue)
app.mount("#app")