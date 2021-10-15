const express = require("express");
const session = require("express-session");

// API routes
const productsRoutesAPI = require("./routes/productsRoutesAPI");
const usersRoutesAPI = require("./routes/usersRoutesAPI");

const methodOverride = require("method-override");
const cookies = require("cookie-parser");
// const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const cors = require("cors");
// const logger = require('morgan');

// App
const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  session({
    secret: "Ecotias",
    resave: false,
    saveUninitialized: false,
  })
); // Session login
app.use(cookies()); // Cookies
app.use(express.static(__dirname + "/public")); // Static files
app.use(express.urlencoded({ extended: false })); // URL Parser
app.use(express.json()); // JSON Parser
app.use(cors());
app.use(methodOverride("_method")); // PUT & DELETE methods

// Template engine
app.set("view engine", "ejs");
app.set("views", "./views");


// API routes
app.use("/api/usuarios", usersRoutesAPI); // Users
app.use("/api/productos", productsRoutesAPI); // Products

//app.use((req, res, next) => res.render('users/not-found')); // Error view

// Server
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
