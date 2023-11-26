const { createApp } = Vue


const app = createApp({
    data(){
        return{
            modal: false
        }
    },

    methods: {
        mostrarModal(){
            this.modal= true
        },
        cerrarModal(){
            this.modal= false
        },
    }
})

app.mount("#app")