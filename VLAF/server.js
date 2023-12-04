const express = require('express');
const app = express();
const PORT = process.env.PORT || 1000;

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
});

app.use(express.json());

// Datos de ejemplo
let productos = [
  { id: 1, nombre: 'Producto 1' },
  { id: 2, nombre: 'Producto 2' },
];

// Ruta para obtener todos los productos
app.get('/api/productos', (req, res) => {
  console.log('/')
  return res.json(productos);

});

// Ruta para obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  res.json(producto);
});

// Ruta para agregar un nuevo producto
app.post('/api/productos', (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un producto por ID
app.put('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productoIndex = productos.findIndex(p => p.id === id);

  if (productoIndex === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  productos[productoIndex] = req.body;
  res.json(productos[productoIndex]);
});

// Ruta para eliminar un producto por ID
app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter(p => p.id !== id);
  res.json({ mensaje: 'Producto eliminado correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
