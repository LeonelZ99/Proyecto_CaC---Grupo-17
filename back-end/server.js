
// Importamos el modulo express
const express = require("express");

// Creamos una instancia de express
const app = express();

// Declaracion del puerto
const PORT = 3000;

// utilizamos el metodo .get para gestionar devoluciones de solicitudes
app.get("/tejidos", (req,res)=>{
    res.send("Holaa esta es una respuesta a la peticion de la solicitud")
});

// Inicializacion del servidor
app.listen(PORT, ()=>{
    console.log(`servidor escuchando el puerto: ${PORT}`)
});