import { cartDao } from "../daos/mongodb/cart.daos.js";
import { CustomError } from "../utils/error.custom.js";
import * as productService from './products.services.js'

export const getAllCarts = async (page, limit, first_name, sort) => {
  try {
    return cartDao.getAllCarts(page, limit, first_name, sort);
  } catch (error) {
    throw new Error(error);
  }
};

export const createCart = async (obj) => {
  try {
    const product = await cartDao.createCart(obj);
    if (!product) throw new CustomError("Error al crear producto", 400);
    return product;
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (id, obj) => {
  try {
    const product = await cartDao.updateCart(id, obj);
    if (!product) throw new CustomError("Error al actualizar producto", 400);
    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (id) => {
  try {
    const product = await cartDao.deleteCartById(id);
    if (!product) throw new CustomError("Error al eliminar producto", 400);
    return {
      id: product._id,
      title: product.title,
    };
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const product = await cartDao.getById(id);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return product;
  } catch (error) {
    throw error;
  }
};

export const addProductToCart = async (cartId, productId) => {
    try {
        await productService.getById(productId);
        const cartUpd = await cartDao.addProductToCart(cartId, productId);
        if (!cartUpd) throw new CustomError("Error adding pet", 404);
        return cartUpd;
    } catch (error) {
        throw error;
    }
}