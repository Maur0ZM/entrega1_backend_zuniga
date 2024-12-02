import { cartDao } from "../daos/mongodb/cart.daos.js";
import { CustomError } from "../utils/error.custom.js";
import * as productService from "./products.services.js";

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
    if (!cartUpd) throw new CustomError("Error al añadir el producto", 404);
    return cartUpd;
  } catch (error) {
    throw error;
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    await productService.getById(productId);
    const cartUpd = await cartDao.removeProductFromCart(cartId, productId);
    if (!cartUpd) throw new CustomError("Error al eliminar el producto", 404);
    return cartUpd;
  } catch (error) {
    throw error;
  }
};

export const updateProductFromCart = async (cartId, newProducts) =>{
  try {
    const cartUpd = await cartDao.updateProductFromCart(cartId, newProducts);
    if(!cartUpd) throw new CustomError('Error al actualizar productos', 404);
    return cartUpd;
  } catch (error) {
    throw error
  }
};

export const updateProductFromCartC = async (cartId, pruductId, newProducts) => {
  try {
    await productService.getById(pruductId)
    const cartUpd = await cartDao.updateProductFromCartC(cartId, pruductId,newProducts);
    if(!cartUpd) throw new CustomError('Error al actualizar productos', 404);
    return cartUpd;
  } catch (error) {
    throw error
  }
}

export const removeAllProductsFromCart = async (cartId) => {
  try {
    const cartUpd = await cartDao.removeAllProductsFromCart(cartId);
    if(!cartUpd) throw new CustomError('Error al eliminar productos', 404);
    return cartUpd;
  } catch (error) {
    throw error;
  }
}