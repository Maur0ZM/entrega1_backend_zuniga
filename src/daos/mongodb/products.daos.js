import { productModel } from "./models/products.models.js";

class ProductDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async getAllProducts(page = 1, limit = 5, first_name, sort) {
    try {
      const filter = first_name ? { first_name: first_name } : {};
      let sortOrder = {};
      if (sort)
        sortOrder.age = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      // $sort: { age: 1 }
      return await this.model.paginate(filter, {
        page,
        limit,
        sort: sortOrder,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(obj) {
    try {
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteProductsById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const productsDao = new ProductDaoMongo(productModel);
