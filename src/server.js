const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);  // Asegúrate de montar el enrutador de carritos aquí

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
