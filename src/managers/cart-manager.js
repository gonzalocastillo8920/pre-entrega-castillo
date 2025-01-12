import {promises as fs} from "fs";

class CartManager {

    constructor(path) {
        this.carts = [];
        this.path = path;
        this.ultId = 0;

        this.cargarCarritos();
    }

    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if(this.carts.length > 0) {
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            await this.guardarCarritos();
        }
    };

    async mostrarCarritos() {
        const arraycarritos = await this.leerArchivo();
        return arraycarritos;
    }

    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    };

    async crearCarrito() {
        const nuevoCarrito = {
            id: ++this.ultId,
            products: []
        };
        this.carts.push(nuevoCarrito);

        // guardamos el array en el archivo:
        await this.guardarCarritos();
        return nuevoCarrito;
    };

    async getCarritoById(cartId) {
        const carrito = this.carts.find(carr => carr.id === cartId);

        if(!carrito) {
            throw new Error("No existe carrito con ese id");
        };
        return carrito;
    };

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        const carrito = await this.getCarritoById(cartId);

        const existeProducto = carrito.products.find(p => p.product === productId);

        if(existeProducto) {
            existeProducto.quantity += quantity;
        } else {
            carrito.products.push({product: productId, quantity});
        };
        await this.guardarCarritos();
        return carrito;
    };

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayCarritos = JSON.parse(respuesta);
            return arrayCarritos;
        } catch (error) {
            console.log("No se puede leer el archivo de los carritos.");
        }
    }
};

export default CartManager;