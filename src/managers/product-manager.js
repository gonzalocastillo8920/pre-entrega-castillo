import {promises as fs} from "fs";

class ProductManager {
    static ultId = 0;
    constructor(path) {
        this.products = []
        this.path = path;
    };

    async addProduct({ code, title, price, category, thumbnails=[], stock, description, status=true }) {

        const arrayProductos = await this.leerArchivo();

        if (!code || !title || !description || !price || !stock || !category || !status) {
            console.log("Todos los campos son obligatorios!!");
            return;
        }

        // Creamos el objeto
        const nuevoProducto = {
            id: ++ProductManager.ultId,
            code,
            title,
            description,
            price,
            stock,
            category,
            status            
        };

        // agrego el producto al array de productos:
        arrayProductos.push(nuevoProducto);

        // guardo el array
        await this.guardarArchivo(arrayProductos);
    }

    async getProducts() {
        const arrayProductos = await this.leerArchivo();
        return arrayProductos;
    }

    async getProductById(id) {
        const arrayProductos = await this.leerArchivo();
        const producto = arrayProductos.find(item => item.id === id);

        if (!producto) {
            return "Producto no encontrado!";
        } else {
            return producto;
        }
    }

    async agregarProducto() {
        const arrayProductos = await this.leerArchivo();
        const { code, title, price, category, thumbnails = [], stock, description, status= true } = runInNewContext.body;
        if (!code || !title || !description || !price || !stock || !category){
            console.log("Todos los campos son obligatorios!!");
            return;
        } else {
            const nuevoProducto = {
                id: ++ProductManager.ultId,
                code,
                title,
                price,
                category,
                thumbnails,
                stock,
                description,
                status
            };
            arrayProductos.push(nuevoProducto);
            guardarArchivo(arrayProductos);
            console.log("producto agregado satisfctoriamente!");
            
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Tenemos un error al guardar el archivo.");
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.log("Tenemos un error al leer el archivo.");

        }
    }
};

export default ProductManager;