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
      const response = await this.model.findByIdAndUpdate(
        cartId,
        { $pull: { products: productId } },
        { new: true }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductFromCart(cartId, newProducts) {
    try {
      const response = await this.model.updateOne(
        { _id: cartId },
        {
          $set: {
            products: newProducts,
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductFromCartC(cartId, productId, newProducts) {
    try {
      const cart = await this.model.findOne({ _id: cartId });

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      const updatedProducts = cart.products.reduce((acc, product) => {
        if (product._id.toString() === productId) {
          return [...acc, ...newProducts];
        }
        acc.push(product);
        return acc;
      }, []);

      const response = await this.model.updateOne(
        { _id: cartId },
        { $set: { products: updatedProducts } }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeAllProductsFromCart(cartId) {
    try {
      const response = await this.model.updateOne(
        { _id: cartId },
        { $set: { products: [] } }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const cartDao = new CartDaoMongo(CartModel);
