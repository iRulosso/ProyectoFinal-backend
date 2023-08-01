import * as service from '../Services/products.services.js'

export const getByIdCtr = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await service.getByIdProduct(id);
      if (!item) throw new Error("Product not found!");
  
      res.json(item);
    } catch (error) {
      next(error);
    }
  };
  

  export const createCtr = async (req, res, next) => {
    try {
      const product = { ...req.body };
      const newProduct = await service.AddProduct(product);
      if (!newProduct) throw new Error("Validation Error!");
      else
        res.json({
          data: newProduct,
        });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateCtr = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, stock } = req.body;
  
      let product = await service.getByIdProduct(id);
  
      if (!product) throw new Error("Product not found!");
  
      const productUpdated = await service.updateProduct(id, {
        name,
        price,
        stock,
      });
  
      res.json({
        msg: "Product updated",
        data: productUpdated,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteCtr = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      await service.deleteProduct(id);
  
      res.json({
        msg: "product deleted",
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getAllCtr = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const response = await service.getAllProducts(page, limit);
      const next = response.hasNextPage ? `http://localhost:8080/users/all?page=${response.nextPage}` : null;
      const prev = response.hasPrevPage ? `http://localhost:8080/users/all?page=${response.prevPage}` : null;
      res.json({
        info: {
          count: response.totalDocs,
          pages: response.totalPages,
          next,
          prev
        },
        results: response.docs
      });
    } catch (error) {
      next(error);
    }
  };