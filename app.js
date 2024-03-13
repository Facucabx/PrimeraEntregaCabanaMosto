const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

// Middleware para parsear el body de las peticiones a JSON
app.use(express.json());

// Rutas para productos
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    // Implementación para obtener todos los productos
});

productsRouter.get('/:pid', (req, res) => {
    // Implementación para obtener un producto por su id
});

productsRouter.post('/', (req, res) => {
    // Implementación para agregar un nuevo producto
});

productsRouter.put('/:pid', (req, res) => {
    // Implementación para actualizar un producto
});

productsRouter.delete('/:pid', (req, res) => {
    // Implementación para eliminar un producto
});

// Rutas para carritos
const cartsRouter = express.Router();

cartsRouter.get('/:cid', (req, res) => {
    // Implementación para obtener los productos de un carrito por su id
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    // Implementación para agregar un producto a un carrito
});

// Montar los routers en las rutas específicas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});