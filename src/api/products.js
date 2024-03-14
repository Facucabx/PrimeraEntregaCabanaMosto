const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Ruta raíz GET /api/products/
router.get('/', (req, res) => {
  try {
    // Lógica para obtener todos los productos de la base
    const productsPath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(productsData);
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

// Ruta GET /api/products/:pid
router.get('/:pid', (req, res) => {
  try {
    const pid = req.params.pid;
    // Lógica para obtener el producto con el id proporcionado
    const productsPath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(productsData);
    const product = products.find(product => product.id === pid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});

// Ruta raíz POST /api/products/
router.post('/', (req, res) => {
  try {
    const newProduct = req.body;
    // Lógica para agregar un nuevo producto
    const productsPath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    let products = JSON.parse(productsData);
    const id = Math.random().toString(36).substr(2, 9);
    newProduct.id = id;
    products.push(newProduct);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    res.json(newProduct);
  } catch (error) {
    console.error('Error al crear nuevo producto:', error);
    res.status(500).json({ error: 'Error al crear el producto.' });
  }
});

// Ruta PUT /api/products/:pid
router.put('/:pid', (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    // Lógica para actualizar el producto con el id proporcionado
    const productsPath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    let products = JSON.parse(productsData);
    const index = products.findIndex(product => product.id === pid);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
      res.json({ message: 'Producto actualizado exitosamente.' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
});

// Ruta DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
  try {
    const pid = req.params.pid;
    // Lógica para eliminar el producto con el id proporcionado
    const productsPath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    let products = JSON.parse(productsData);
    const index = products.findIndex(product => product.id === pid);
    if (index !== -1) {
      products.splice(index, 1);
      fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
      res.json({ message: 'Producto eliminado exitosamente.' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});

module.exports = router;
