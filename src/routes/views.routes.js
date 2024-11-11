import { Router } from "express";
import productsManager from "../managers/products.manager.js";
const router = Router();

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

router.get("/products", async (req, res) => {
  const products = await productsManager.getAllProducts();
  res.render("home", { products });
});


export default router;
