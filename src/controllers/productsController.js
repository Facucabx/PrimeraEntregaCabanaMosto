const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const productsController = {
    getAllProducts: () => {
        const productsData = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(productsData);
    },
    getProductById: (id) => {
        const productsData = fs.readFileSync(productsFilePath, 'utf-8');
        const products = JSON.parse(productsData);
        return products.find(product => product.id === id);
    },
    addProduct: (product) => {
        let productsData = fs.readFileSync(productsFilePath, 'utf-8');
        let products = JSON.parse(productsData);
        products.push(product);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    },
    updateProduct: (id, updatedProduct) => {
        let productsData = fs.readFileSync(productsFilePath, 'utf-8');
        let products = JSON.parse(productsData);
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
            return true;
        }
        return false;
    },
    deleteProduct: (id) => {
        let productsData = fs.readFileSync(productsFilePath, 'utf-8');
        let products = JSON.parse(productsData);
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
            return true;
        }
        return false;
    }
};

module.exports = productsController;
