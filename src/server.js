import express from "express";
import http from "http"; // Importar http para crear el servidor HTTP
import { Server } from "socket.io"; // Importar socket.io
import productRouter from "../src/routes/products.router.js";
import cartRouter from "../src/routes/carts.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./daos/mongodb/dbConnection.js";
import { engine } from "express-handlebars";
import path from "path";
import { productsDao } from "./daos/mongodb/products.daos.js";
import { cartDao } from "./daos/mongodb/cart.daos.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use(express.static(path.join(process.cwd(), "src", "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);
app.use("/api", cartRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error.message);
  });

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  socket.emit("getAllProducts", await productsDao.getAllProducts());

  socket.on("createProduct", async (product) => {
    try {
      await productsDao.createProduct(product);
      socket.emit("getAllProducts", await productsDao.getAllProducts());
    } catch (error) {
      console.log("Error al crear producto -->" + error.message);
      socket.emit("validatorError", { error: "Error al crear producto" });
    }
  });

  socket.on("deleteProduct", async (id) => {
    try {
      await productsDao.deleteProductsById(id);
      socket.emit("getAllProducts", await productsDao.getAllProducts());
    } catch (error) {
      console.log("Error al eliminar producto -->" + error.message);
      socket.emit("validatorError", { error: "Error eliminar producto" });
    }
  });

  socket.on("getProductsByPage", async (data) => {
    const { page } = data;
    const products = await productsDao.getAllProducts(page);
    socket.emit("getAllProducts", products);
  });

  socket.emit("getAll", await cartDao.getAllCarts(), await productsDao.getAllProducts());

  socket.on("deleteCart", async (id) => {
    try {
      await cartDao.deleteCartById(id);
      socket.emit("getAll", await cartDao.getAllCarts());
    } catch (error) {
      console.log("Error al eliminar producto -->" + error.message);
      socket.emit("validatorError", { error: "Error eliminar producto" });
    }
  });

  socket.on("addToCart", async (ids) => {    
    try {
      await cartDao.addProductToCart(ids.cartId, ids.productId);
      socket.emit("getAll", await cartDao.getAllCarts(), await productsDao.getAllProducts());
    } catch (error) {
      console.log('Error al añadir produto al carrito -->' + error.message);
      socket.emit("validatorError", { error: "Error al añadir producto al carrito" });
    }
  });

  socket.on('removeProductFromCart', async (ids) => {
    try {
      await cartDao.removeProductFromCart(ids.cartId, ids.productId);
      socket.emit("getAll", await cartDao.getAllCarts(), await productsDao.getAllProducts());
    } catch (error) {
      console.log('Error al eliminar producto del carrito -->' + error.message);
      socket.emit("validatorError", { error: "Error al eliminar producto del carrito" });
    }
  })
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Conectado al puerto ${PORT}`);
});
