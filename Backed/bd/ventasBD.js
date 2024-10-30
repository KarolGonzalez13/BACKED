const Venta = require("../modelos/VentaModelo");
const ventasBD = require("./conexion").ventas;
const usuariosBD = require("./conexion").usuarios;
const productosBD = require("./conexion").productos;

async function validarRelacion(id_usu, id_prod) {
    const usuario = await usuariosBD.doc(id_usu).get();
    const producto = await productosBD.doc(id_prod).get();
    return usuario.exists && producto.exists;
}

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    let ventasConNombres = [];

    for (let venta of ventas.docs) {
        const ventaData = venta.data();

        // Obtener el nombre del usuario usando id_usu de la venta
        const usuario = await usuariosBD.doc(ventaData.id_usu).get();
        const nombreUsuario = usuario.exists ? usuario.data().nombre : "Usuario no encontrado";

        // Obtener el nombre del producto usando id_prod de la venta
        const producto = await productosBD.doc(ventaData.id_prod).get();
        const nombreProducto = producto.exists ? producto.data().nombreP : "Producto no encontrado";

        // Agregar los nombres al objeto de venta
        const ventaConNombres = {
            id: venta.id,                 // Incluimos el ID de la venta
            id_usu: ventaData.id_usu,     // Mantenemos el ID del usuario
            nombreUsuario,                // Añadimos el nombre del usuario
            id_prod: ventaData.id_prod,   // Mantenemos el ID del producto
            nombreProducto,               // Añadimos el nombre del producto
            cantidad: ventaData.cantidad,
            fecha: ventaData.fecha,
            hrs: ventaData.hrs,
            estado: ventaData.estado
        };

        ventasConNombres.push(ventaConNombres);
    }

    return ventasConNombres;
}

async function buscarVentaPorID(id) {
    const venta = await ventasBD.doc(id).get();
    return venta.exists ? new Venta({ id: venta.id, ...venta.data() }).getProducto : null;
}

async function nuevaVenta(data) {
    const { id_usu, id_prod, cantidad } = data; // Usamos los nombres correctos
    let ventaValida = false;

    // Validar que el usuario y el producto existen
    if (await validarRelacion(id_usu, id_prod)) {
        const nuevaVenta = new Venta({ id_usu, id_prod, cantidad });
        await ventasBD.doc().set(nuevaVenta.getProducto);  // Crear la nueva venta con los valores correctos
        ventaValida = true;
    }
    
    return ventaValida;
}

async function actualizarEstatusVenta(id) {
    const venta = await buscarVentaPorID(id);
    
    if (venta) {
        if (venta.estado === "Cancelado") {
            console.log("La venta ya está cancelada.");
            return { success: false, message: "La venta ya está cancelada." };
        }
        
        // Cambiamos el estado a "Cancelado"
        await ventasBD.doc(id).update({ estado: "Cancelado" });
        return { success: true, message: "La venta ha sido cancelada." };
    }

    // Si no se encontró la venta
    return { success: false, message: "Venta no encontrada." };
}

module.exports = {
    mostrarVentas,
    buscarVentaPorID,
    nuevaVenta,
    actualizarEstatusVenta
};
