const express = require('express');
const productsRouter = require('./src/api/products');
const cartsRouter = require('./src/api/carts');

const app = express();
const PORT = 8080;

app.use(express.json());

// Rutas para los productos
app.use('/api/products', productsRouter);

// Rutas para los carritos
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
