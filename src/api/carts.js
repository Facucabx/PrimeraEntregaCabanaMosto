const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Ruta raíz POST /api/carts/
router.post('/', (req, res) => {
  try {
    const newCart = req.body;
    // Lógica para crear un nuevo carrito
    const cartsPath = path.join(__dirname, '..', 'data', 'carrito.json');
    const cartsData = fs.readFileSync(cartsPath, 'utf8');
    let carts = JSON.parse(cartsData);
    const id = Math.random().toString(36).substr(2, 9);
    newCart.id = id;
    carts.push(newCart);
    fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
    res.json(newCart);
  } catch (error) {
    console.error('Error al crear nuevo carrito:', error);
    res.status(500).json({ error: 'Error al crear el carrito.' });
  }
});

// Ruta GET /api/carts/:cid
router.get('/:cid', (req, res) => {
  try {
    const cid = req.params.cid;
    // Lógica para obtener los productos de un carrito por ID
    const cartsPath = path.join(__dirname, '..', 'data', 'carrito.json');
    const cartsData = fs.readFileSync(cartsPath, 'utf8');
    const carts = JSON.parse(cartsData);
    const cart = carts.find(cart => cart.id === cid);
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener productos del carrito:', error);
    res.status(500).json({ error: 'Error al obtener los productos del carrito.' });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    // Lógica para agregar un producto a un carrito por ID de carrito y producto
    const cartsPath = path.join(__dirname, '..', 'data', 'carrito.json');
    const cartsData = fs.readFileSync(cartsPath, 'utf8');
    let carts = JSON.parse(cartsData);
    const cartIndex = carts.findIndex(cart => cart.id === cid);
    if (cartIndex !== -1) {
      const productIndex = carts[cartIndex].products.findIndex(prod => prod.id === pid);
      if (productIndex !== -1) {
        carts[cartIndex].products[productIndex].quantity += quantity;
      } else {
        carts[cartIndex].products.push({ id: pid, quantity });
      }
      fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
      res.json({ message: 'Producto agregado al carrito exitosamente.' });
    } else {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    }
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
  }
});

module.exports = router;
