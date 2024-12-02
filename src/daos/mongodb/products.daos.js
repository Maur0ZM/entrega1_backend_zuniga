import { productModel } from "./models/products.models.js";

class ProductDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async getAllProducts (page = 1, limit = 5, category, status, sort) {
    try {
      const filter = {};
      if (category || status !== undefined) {
        filter.$or = [];
        if (category) filter.$or.push({ category });
        if (status !== undefined) filter.$or.push({ status });
      }

      let sortOrder = {};
      if (sort) {
        sortOrder.age = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      }

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
