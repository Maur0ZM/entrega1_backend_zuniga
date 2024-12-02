import { Router } from "express";
import * as controllers from '../controllers/products.controllers.js';

const router = Router();

//Vistas
router.get('/view/realTimeProducts', controllers.renderRealTimeP);

//Rutas CRUD product

router.get('/', controllers.getAllProducts);

router.get('/:id', controllers.getById);

router.put('/:id', controllers.updateProduct);

router.delete('/:id', controllers.deleteProduct);

router.post('/', controllers.createProduct);

export default router;