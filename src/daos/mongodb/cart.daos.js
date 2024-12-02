import { CartModel } from "./models/cart.models.js";

class CartDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async getAllCarts(page = 1, limit = 5, first_name, sort) {
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

  async createCart(obj) {
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

  async updateCart(id, obj) {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteCartById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const response = await this.model.findByIdAndUpdate(
        cartId,
        { $push: { products: productId } },
        { new: true }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      await this.model.findByIdAndUpdate(
        cartId,
        { $pull: { products: { _id: productId } } },
        { new: true }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const cartDao = new CartDaoMongo(CartModel);
