import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import routerCarts from "./routes/carts.router.js";
import routerProducts from "./routes/products.router.js";
import { Server } from "socket.io";
import path from "path";
import productsManager from "./managers/products.manager.js";
import { productsValidatorWS } from "./middlewares/products.middlewares.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(process.cwd(), "src", "public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use("/api/carts", routerCarts);
app.use("/api/products", routerProducts);

app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("🚀 Server listening on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socketServer.emit("getAllProducts", await productsManager.getAllProducts());

  socket.on("createProduct", async (product) => {
    const validator = productsValidatorWS(product);
    if (!validator.valid) {
      socket.emit("validatorError", validator);
      return;
    }
    await productsManager.createProduct(product);
    socketServer.emit("getAllProducts", await productsManager.getAllProducts());
  });

  socket.on("deleteProduct", async (id) => {
    await productsManager.deleteProductsById(id);
    socketServer.emit("getAllProducts", await productsManager.getAllProducts());
  });
});
