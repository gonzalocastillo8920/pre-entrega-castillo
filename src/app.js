import express from "express";
import carritoRouter from "./routes/cart.router.js";
import productosRouter from "./routes/product.router.js";
const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas
app.use("/api/carts", carritoRouter);
app.use("/api/products", productosRouter);

app.get("/", (req, res) => {
    res.send("Primer pre entrega BackendUno");
});

app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto ${PUERTO}`);
});