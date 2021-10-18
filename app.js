const express = require("express");
const path = require("path");

// API routes
const productsRoutesAPI = require("./routes/productsRoutesAPI");
const usersRoutesAPI = require("./routes/usersRoutesAPI");

const cors = require("cors");
const logger = require("morgan");

// App
const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(logger());
app.use(express.urlencoded({ extended: false })); // URL Parser
app.use(express.json()); // JSON Parser
app.use(cors());

// Main route
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views/index.html"))
);

// API routes
app.use("/api/usuarios", usersRoutesAPI); // Users
app.use("/api/productos", productsRoutesAPI); // Products

// Server
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
