import express from 'express';
const app = express();
const PORT = process.env.PORT||8080

const server = app.listen(PORT, ()=> {
    console.log("Servidor Escuchando En: "+PORT)
})

