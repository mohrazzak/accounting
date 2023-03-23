const { Router } = require('express');

const router = Router();

const authRoutes = require('../modules/auth/auth.routes');
const productRoutes = require('../modules/product/product.routes');

router.use('/auth', authRoutes);

router.use('/products', productRoutes);

module.exports = router;
