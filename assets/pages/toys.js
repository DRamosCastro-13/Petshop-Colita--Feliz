const url = 'https://moviestack.onrender.com/api/petshop'

console.log("inicio")

const { createApp } = Vue

const optionsVue = {
    data() {
        return {
            petshop: [],
            categorias: [],
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
    methods: {

    }
}
console.log("final")
const app = createApp(optionsVue)
app.mount("#app")