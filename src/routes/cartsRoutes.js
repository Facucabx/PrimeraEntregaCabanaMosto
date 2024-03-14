const express = require('express');
const cartsController = require('../controllers/cartsController');

const cartsRouter = express.Router();

// Ruta para crear un nuevo carrito
cartsRouter.post('/', (req, res) => {
    const newCart = cartsController.createCart();
    res.json(newCart);
});

// Ruta para listar los productos de un carrito específico
cartsRouter.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cartProducts = cartsController.getCartProducts(cartId);
    res.json(cartProducts);
});

// Ruta para agregar un producto al carrito seleccionado
cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const success = cartsController.addProductToCart(cartId, productId);
    if (success) {
        res.json({ message: 'Producto agregado exitosamente' });
    } else {
        res.status(404).json({ message: 'Ocurrio un error, el producto no se agrego.' });
    }
});

module.exports = cartsRouter;