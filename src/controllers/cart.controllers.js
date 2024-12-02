import * as services from "../services/cart.services.js";

export const getAllCarts = async (req, res, next) => {
  try {
    const { page, limit, first_name, sort } = req.query;
    const response = await services.getAllCarts(page, limit, first_name, sort);
    res.json({
      results: response.docs,
      info: {
        count: response.totalDocs,
        pages: response.totalPages,
        next: response.hasNextPage
          ? [
              `http://localhost:8080/products/view/realTimeProducts?page=${response.nextPage}`,
              `http://localhost:8080/products?page=${response.nextPage}`,
            ]
          : null,
        prev: response.hasPrevPage
          ? [
              `http://localhost:8080/products/view/realTimeProducts?page=${response.prevPage}`,
              `http://localhost:8080/products?page=${response.prevPage}`,
            ]
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const response = await services.createCart(req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.updateCart(id, req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.deleteCart(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.getById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const renderRealTimeC = async (req, res, next) => {
  try {
    res.render("realTimeCarts", {
      title: "Real Time Carts",
    });
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { productId } = req.params;
    const newProductToCart = await services.addProductToCart(cartId, productId);
    res.json(newProductToCart);
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { productId } = req.params;
    const updateCart = await services.removeProductFromCart(cartId, productId);
    res.json(updateCart);
  } catch (error) {
    next(error);
  }
};

export const updateProductFromCart = async (req, res, next) => {
  try {
    const { newProducts } = req.body;
    const { cartId } = req.params;
    const updateCart = await services.updateProductFromCart(cartId, newProducts);
    res.json(updateCart);
  } catch (error) {
    next(error);
  }
}

export const updateProductFromCartC = async (req, res, next) => {
  try {
    const { newProducts } = req.body;
    const { cartId } = req.params;
    const { productId } = req.params;
    const updateCart = await services.updateProductFromCartC(cartId, productId, newProducts);
    res.json(updateCart);
  } catch (error) {
    next(error);
  }
}

export const removeAllProductsFromCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const updateCart = await services.removeAllProductsFromCart(cartId);
    res.json(updateCart);
  } catch (error) {
    next(error);
  }
};