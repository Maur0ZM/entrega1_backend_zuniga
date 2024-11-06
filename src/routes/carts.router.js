import { Router } from "express";
import cartManager from "../managers/cart.manager.js";

const routerCarts = Router();

routerCarts.get("/", async (req, res) => {
  try {
    const cart = await cartManager.getAllCarts();
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerCarts.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(200).json(`Carro creado con exito ID: ${cart.id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerCarts.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cartById = await cartManager.getCartById(id);
    res.status(200).json({ id: cartById.id, products: cartById.products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerCarts.post("/:idCart/product/:idProd", async (req, res) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const add = await cartManager.addProductToCart(idCart, idProd);
    res.status(200).json({add});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default routerCarts;
