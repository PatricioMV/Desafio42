import express from 'express';
import productController  from '../controllers/product.controller.js';
import { productValidator, productIDValidator } from '../utils/validators.js';

export const productosRouter = express.Router();

productosRouter.get('/', productController.getAll);

productosRouter.get('/:id', productIDValidator, productController.getByID);

productosRouter.post('/', productValidator, productController.createProduct);

productosRouter.put('/:id', productIDValidator, productValidator, productController.updateProduct);

productosRouter.delete('/:id', productIDValidator, productController.deleteProduct);

