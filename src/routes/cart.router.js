import { Router } from "express";
import CartManager from "../managers/cart-manager.js";
const carritoRouter = Router();
const manager = new CartManager("./src/data/carts.json");

// crear nuevo carrito:
carritoRouter.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await manager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({error: "Error al intentar crear un carrito."});
    };
});

// Listamos los productos que pertenecen a determinado carrito:
carritoRouter.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);

    try {
        const carritoBuscado = await manager.getCarritoById(cartId);
        res.json(carritoBuscado.products);
    } catch (error) {
        res.status(500).json({error: "Error en busqueda del carrito solicitado."});
    };
});

// agregar productos al carrito:
carritoRouter.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await manager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        res.status(500).json({error: "No se pudo agregar al carrito, verifique."});
    };
});

export default carritoRouter;