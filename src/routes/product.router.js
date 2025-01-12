import { Router } from "express";
const productosRouter = Router();

// Import ProductManager
import ProductManager from "../managers/product-manager.js";
const manager = new ProductManager("./src/data/productos.json");

productosRouter.get("/", async (req, res) => {
    let limit = req.query.limit;

    const productos = await manager.getProducts();

    if(limit) {
        res.send(productos.slice(0, limit));
    } else {
        res.send(productos);
    }
});

productosRouter.get("/:id", (req, res) => {
    let id = req.params.id;
    const productoBuscado = productos.find(prod => prod.id === id);
    res.send(productoBuscado);
});

export default productosRouter;