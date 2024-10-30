const rutas = require("express").Router();

const { mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarUsuarioPorID, actualizarUsuario } = require("../bd/usuariosBD");
const { mostrarProductos, nuevoProducto, borrarProducto, buscarProductoPorID, actualizarProducto } = require("../bd/productosBD");
const { mostrarVentas, buscarVentaPorID, nuevaVenta, actualizarEstatusVenta } = require("../bd/ventasBD");

rutas.get("/", async (req, res) => {
    const usuariosValidos = await mostrarUsuarios();
    res.json(usuariosValidos);
});

rutas.get("/productos", async (req, res) => {
    const productosValidos = await mostrarProductos();
    res.json(productosValidos);
});

rutas.get("/ventas", async (req, res) => {
    const ventasValidas = await mostrarVentas();
    res.json(ventasValidas);
});

rutas.get("/buscarUsuarioPorId/:id", async (req, res) => {
    const usuarioValido = await buscarUsuarioPorID(req.params.id);
    res.json(usuarioValido);
});

rutas.get("/buscarProductoPorId/:id", async (req, res) => {
    const productoValido = await buscarProductoPorID(req.params.id);
    res.json(productoValido);
});

rutas.get("/buscarVentaPorId/:id", async (req, res) => {
    const ventaValida = await buscarVentaPorID(req.params.id);
    res.json(ventaValida);
});

rutas.delete("/borrarUsuario/:id", async (req, res) => {
    const usuarioBorrado = await borrarUsuario(req.params.id);
    res.json(usuarioBorrado);
});

rutas.delete("/borrarProducto/:id", async (req, res) => {
    const productoBorrado = await borrarProducto(req.params.id);
    res.json(productoBorrado);
});

rutas.post("/nuevoUsuario", async (req, res) => {
    const usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

rutas.post("/nuevoProducto", async (req, res) => {
    const productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

rutas.post("/nuevaVenta", async (req, res) => {
    const ventaValida = await nuevaVenta(req.body);
    res.json(ventaValida);
});

rutas.patch("/actualizarEstatusVenta/:id", async (req, res) => {
    const ventaActualizada = await actualizarEstatusVenta(req.params.id);
    res.json(ventaActualizada);
});

rutas.patch("/actualizarUsuario/:id", async (req, res) => {
    const { nombre, usuario, password } = req.body;
    const usuarioEditado = await actualizarUsuario(req.params.id, nombre, usuario, password);
    res.json(usuarioEditado);
});

rutas.patch("/actualizarProducto/:id", async (req, res) => {
    const { nombreProducto, precioProducto, descripcionProducto } = req.body;
    const productoEditado = await actualizarProducto(req.params.id, nombreProducto, precioProducto, descripcionProducto);
    res.json(productoEditado);
});

module.exports = rutas;
