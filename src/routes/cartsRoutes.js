const express = require('express');
const cartsController = require('../controllers/cartsController');

const cartsRouter = express.Router();

cartsRouter.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = cartsController.getCartById(cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const success = cartsController.addProductToCart(cartId, productId);
    if (success) {
        res.json({ message: 'Product added to cart successfully' });
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
});

module.exports = cartsRouter;
