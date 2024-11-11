import { Router } from "express";
import productsManager from "../managers/products.manager.js";
import { productsValidatorPostman } from "../middlewares/products.middlewares.js";

const routerProducts = Router();

routerProducts.get("/", async (req, res) => {
  try {
    const products = await productsManager.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerProducts.post("/", [productsValidatorPostman], async (req, res) => {
  try {
    const product = await productsManager.createProduct(req.body);
    res.status(201).json({ id: product.id, title: product.title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerProducts.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const busqueda = await productsManager.getById(id);
    res.status(200).json(busqueda);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerProducts.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const busqueda = await productsManager.updateProduct(id, req.body);
    res.status(200).json(busqueda);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerProducts.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const busqueda = await productsManager.deleteProductsById(id);
    res.status(200).json(`Producto eliminado con exito 
        ID: ${busqueda.id} 
        Title: ${busqueda.title}
        `);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default routerProducts;
