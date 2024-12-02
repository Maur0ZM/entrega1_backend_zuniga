import { productsDao } from "../daos/mongodb/products.daos.js";
import { CustomError } from "../utils/error.custom.js";

export const getAllProducts = async (page, limit, first_name, sort) => {
  try {
    return productsDao.getAllProducts(page, limit, first_name, sort);
  } catch (error) {
    throw new Error(error);
  }
};

export const createProduct = async (obj) => {
  try {
    const product = await productsDao.createProduct(obj);
    if (!product) throw new CustomError("Error al crear producto", 400);
    return product;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, obj) => {
  try {
    const product = await productsDao.updateProduct(id, obj);
    if (!product) throw new CustomError("Error al actualizar producto", 400);
    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const product = await productsDao.deleteProductsById(id);
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
    const product = await productsDao.getById(id);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return product;
  } catch (error) {
    throw error;
  }
};
