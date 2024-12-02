import * as services from "../services/products.services.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit, category, status, sort } = req.query;
    const response = await services.getAllProducts(
      page,
      limit,
      category,
      status,
      sort
    );
    console.log(response);
    res.json({
      results: response.docs,
      info: {
        count: response.totalDocs,
        pages: response.totalPages,
        pageActual: response.page,
        next: response.hasNextPage
          ? [
              `http://localhost:8080/products/view/realTimeProducts?page=${response.nextPage}`,
              `http://localhost:8080/products?page=${response.nextPage}`
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

export const createProduct = async (req, res, next) => {
  try {
    const response = await services.createProduct(req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.updateProduct(id, req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await services.deleteProduct(id);
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

export const renderRealTimeP = async (req, res, next) => {
  try {
    res.render("realTimeProducts", {
      title: "Real Time Products"
    });
  } catch (error) {
    next(error);
  }
};
