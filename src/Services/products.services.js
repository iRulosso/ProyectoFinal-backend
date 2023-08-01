import ProductDaoMongoDB from '../Daos/products.dao.js';
const productDao = new ProductDaoMongoDB();
import fs from 'fs';
import {__dirname} from '../utils.js';

export const getByIdProduct = async (id) => {
  try {
    const item = await productDao.GetProductById(id);
    if (!item) return false;
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async (page, limit) => {
  try {
    const item = await productDao.GetProducts(page, limit);
    if (!item) return false;
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const AddProduct = async (obj) => {
  try {
    const newProduct = await productDao.AddProduct(obj);
    if (!newProduct) throw new Error("Validation Error!");
    else return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, obj) => {
  try {
    let item = await productDao.GetProductById(id);
    if (!item) {
      throw new Error("Product not found!");
    } else {
      const productUpdate = await productDao.UpdateProduct(id, obj);
      return productUpdate;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const productDeleted = await productDao.deleteProduct(id);
    return productDeleted;
  } catch (error) {
    console.log(error);
  }
};
