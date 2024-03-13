const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
