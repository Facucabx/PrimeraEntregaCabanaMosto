const fs = require('fs');
const path = require('path');

// Ruta al archivo que contiene los datos de los productos
const productsFilePath = path.join(__dirname, '../data/productos.json');

// Controlador de productos
const productsController = {
    // Función para obtener todos los productos
    getAllProducts: () => {
        // Leer los datos de productos desde el archivo
        const productsData = fs.readFileSync(productsFilePath, 'utf-8');
        // Convertir los datos a un array de productos y devolverlo
        return JSON.parse(productsData);
    },

    // Función para obtener un producto por su ID
    getProductById: (productId) => {
        // Leer los datos de productos desde el archivo
        const productsData = fs.readFileSync(productsFilePath, 'utf-8');
        // Convertir los datos a un array de productos
        const products = JSON.parse(productsData);
        // Buscar el producto con el ID especificado y devolverlo
        return products.find(product => product.id === productId);
    },

    // Función para agregar un nuevo producto
    addProduct: (newProductData) => {
        // Leer los datos de productos desde el archivo
        let productsData = fs.readFileSync(productsFilePath, 'utf-8');
        // Convertir los datos a un array de productos
        let products = JSON.parse(productsData);

        // Generar un ID único para el nuevo producto
        const newProductId = generateUniqueId(products);

        // Crear el nuevo producto con el ID generado y los datos proporcionados
        const newProduct = {
            id: newProductId,
            ...newProductData
        };

        // Agregar el nuevo producto al array de productos
        products.push(newProduct);

        // Escribir los productos actualizados en el archivo
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        // Devolver el nuevo producto creado
        return newProduct;
    },

    // Función para actualizar un producto existente
    updateProduct: (productId, updatedProductData) => {
        // Leer los datos de productos desde el archivo
        let productsData = fs.readFileSync(productsFilePath, 'utf-8');
        // Convertir los datos a un array de productos
        let products = JSON.parse(productsData);

        // Encontrar el índice del producto que se desea actualizar
        const index = products.findIndex(product => product.id === productId);
        // Si se encontró el producto
        if (index !== -1) {
            // Actualizar los campos del producto con los datos proporcionados
            products[index] = {
                ...products[index],
                ...updatedProductData,
                id: productId // Asegurar que el ID se mantenga igual
            };

            // Escribir los productos actualizados en el archivo
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

            // Devolver true para indicar que el producto fue actualizado exitosamente
            return true;
        }
        // Devolver false si no se encontró el producto con el ID especificado
        return false;
    },

    // Función para eliminar un producto existente
    deleteProduct: (productId) => {
        // Leer los datos de productos desde el archivo
        let productsData = fs.readFileSync(productsFilePath, 'utf-8');
        // Convertir los datos a un array de productos
        let products = JSON.parse(productsData);

        // Encontrar el índice del producto que se desea eliminar
        const index = products.findIndex(product => product.id === productId);
        // Si se encontró el producto
        if (index !== -1) {
            // Eliminar el producto del array de productos
            products.splice(index, 1);

            // Escribir los productos actualizados en el archivo
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

            // Devolver true para indicar que el producto fue eliminado exitosamente
            return true;
        }
        // Devolver false si no se encontró el producto con el ID especificado
        return false;
    }
};

// Función para generar un ID único para un nuevo producto
function generateUniqueId(products) {
    let newId;
    // Generar un ID aleatorio y comprobar si ya existe en la lista de productos
    do {
        newId = Math.floor(Math.random() * 1000); // Podrías utilizar una lógica más robusta para generar IDs únicos
    } while (products.some(product => product.id === newId));
    return newId;
}

// Exportar el controlador de productos para su uso en otros archivos
module.exports = productsController;
