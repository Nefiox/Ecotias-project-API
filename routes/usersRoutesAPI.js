const express = require('express');
const router = express.Router();

const usersControllerAPI = require('../controllers/usersControllerAPI');


/*** GET ALL USERS ***/
router.get("/", usersControllerAPI.listado); // MUESTRA LISTA DE USUARIOS

/*** GET ONE USER ***/
router.get("/:id", usersControllerAPI.detalle);


module.exports = router;