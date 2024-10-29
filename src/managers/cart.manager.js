import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";
import path from "path";
import productsManager from "./products.manager.js";
import { error } from "node:console";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      };
      const cartsFile = await this.getAllCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      if (carts.length < 0) throw new Error("No hay carritos creados");
      const cartExist = carts.find((c) => c.id === id);
      if (!cartExist) throw new Error("No existe el carrito buscado");
      return cartExist;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductToCart(idCart, idProd) {
    try {
      const prodExists = await productsManager.getById(idProd);
      if (!prodExists) throw new Error("product not exists");

      let cartsFile = await this.getAllCarts();

      const cartExists = await this.getCartById(idCart);      
      if (!cartExists) throw new Error("cart not exists");

      const existsProdInCart = cartExists.products.find(
        (prod) => prod.id === idProd
      );

      if (!existsProdInCart) {
        const product = {
          id: idProd,
          quantity: 1,
        };
        cartExists.products.push(product);
      } else existsProdInCart.quantity += 1;

      const updatedCarts = cartsFile.map((cart) =>
      cart.id === idCart ? cartExists : cart
    );

      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cartExists;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CartManager(path.join(process.cwd(), "src/data/carts.json"));
