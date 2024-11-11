export const productsValidatorPostman = (req, res, next) => {
  const requiredFields = {
    title: "string",
    description: "string",
    code: "number",
    price: "number",
    status: "boolean",
    stock: "number",
    category: "string",
  };

  for (const [field, type] of Object.entries(requiredFields)) {
    if (req.body[field] === undefined || typeof req.body[field] !== type) {
      return res.status(400).json({
        error: "Missing or invalid product data",
        expectedStructure: requiredFields,
      });
    }
  }
  next();
};

export const productsValidatorWS = (product) => {
  const requiredFields = {
    title: "string",
    description: "string",
    code: "number",
    price: "number",
    status: "boolean",
    stock: "number",
    category: "string",
  };

  for (const [field, type] of Object.entries(requiredFields)) {
    if (product[field] === undefined || product[field] === null || typeof product[field] !== type) {
      return {
        valid: false,
        error: "Missing or invalid product data",
        expectedStructure: requiredFields,
      };
    }
  }

  return { valid: true };
};
