const express = require('express');
const router = express.Router();

const productsControllerAPI = require('../controllers/productsControllerAPI');


/*** GET ALL PRODUCTS ***/
router.get('/', productsControllerAPI.listado); // MUESTRA LISTA PRODUCTOS

// /*** GET ONE PRODUCT ***/
router.get('/:id', productsControllerAPI.detalle); // MUESTRA DETALLE DE PRODUCTO


module.exports = router;