const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carrito.json');

const cartModel = {
    getCartById: (id) => {
        const cartsData = fs.readFileSync(cartsFilePath, 'utf-8');
        const carts = JSON.parse(cartsData);
        return carts.find(cart => cart.id === id);
    },
    addProductToCart: (id, productId) => {
        let cartsData = fs.readFileSync(cartsFilePath, 'utf-8');
        let carts = JSON.parse(cartsData);
        const index = carts.findIndex(cart => cart.id === id);
        if (index !== -1) {
            carts[index].products.push(productId);
            fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
            return true;
        }
        return false;
    }
};

module.exports = cartModel;
