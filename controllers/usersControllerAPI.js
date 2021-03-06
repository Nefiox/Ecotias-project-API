let db = require("../database/models/");

const usersControllerAPI = {
  listado: async (req, res) => {
    await db.Usuario.findAll()
      .then((usuario) => {
        let respuesta = {
          count: usuario.length,
          url: req.originalUrl,
          status: 200,
          users: usuario.map((user) => {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              detail: `https://ecotias.herokuapp.com${req.originalUrl}/${user.id}`,
            };
          }),
        };
        res.json(respuesta);
      })
      .catch((err) => console.log(err));
  },
  detalle: async (req, res) => {
    await db.Usuario.findByPk(req.params.id)
      .then((usuario) => {
        let respuesta;
        if (usuario) {
          if (usuario.image === "" || usuario.image === null) {
            respuesta = {
              meta: {
                status: 200,
                url: req.originalUrl,
              },
              data: {
                id: usuario.id,
                name: usuario.name,
                last_name: usuario.last_name,
                email: usuario.email,
                imagen:
                  "https://ecotias.herokuapp.com/images/userImages/default.png",
              },
            };
            res.json(respuesta);
          } else {
            respuesta = {
              meta: {
                status: 200,
                url: req.originalUrl,
              },
              data: {
                id: usuario.id,
                name: usuario.name,
                last_name: usuario.last_name,
                email: usuario.email,
                imagen:
                  "https://ecotias.herokuapp.com/images/userImages/" +
                  usuario.image,
              },
            };
            res.json(respuesta);
          }
        } else {
          respuesta = {
            status: 404,
            msg: "El usuario no existe",
          };
          res.json(respuesta);
        }
      })
      .catch((err) => console.log(err));
  },
};

module.exports = usersControllerAPI;
