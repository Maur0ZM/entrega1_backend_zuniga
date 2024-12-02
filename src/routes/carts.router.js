import { Router } from "express";
import * as controllers from '../controllers/cart.controllers.js';

const router = Router();

//Vistas
router.get('/view/realTimeCarts', controllers.renderRealTimeC);

//Rutas CRUD product

router.get('/', controllers.getAllCarts);

router.get('/:id', controllers.getById);

router.put('/:id', controllers.updateCart);

router.delete('/:id', controllers.deleteCart);

router.post('/', controllers.createCart);

router.post('/add/:cartId/product/:productId', controllers.addProductToCart);
  
export default router;