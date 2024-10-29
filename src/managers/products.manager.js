import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";
import path from "path";
import { error } from "node:console";

class ProductsManager {
  constructor(path) {
    this.path = path;
  }

  async getAllProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createProduct(obj) {
    try {
      const products = await this.getAllProducts();
      const product = { ...obj, id: uuidv4(), status: true, thumbnail: [] };
      const productExist = products.find((p) => p.id === product.id);
      if (productExist) {
        throw new Error("El producto ya existe");
      }
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAllProducts();
      if (!products.length > 0) throw new Error("Lista de productos vacia");
      const product = await products.find((p) => p.id === id);
      if (!product) throw new Error("El producto no se encuentra");
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(id, obj) {
    try {
      const products = await this.getAllProducts();
      let product = await this.getById(id);

      product = { ...product, ...obj };

      const newArray = await products.filter((p) => p.id !== id);
      newArray.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteProductsById(id) {
    try {
      const product = await this.getById(id);
      const products = await this.getAllProducts();
      const newArray = await products.filter((p) => p.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new ProductsManager(
  path.join(process.cwd(), "src/data/products.json")
);
