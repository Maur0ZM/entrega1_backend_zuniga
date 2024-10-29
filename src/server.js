import express from 'express';
import routerCarts from '../routes/carts.router.js';
import routerProducts from '../routes/products.router.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/carts', routerCarts);
app.use('/api/products', routerProducts);

app.listen(8080, () => console.log('listening on port 8080'));