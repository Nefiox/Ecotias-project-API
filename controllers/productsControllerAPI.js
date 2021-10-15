const { sequelize, Sequelize } = require("../database/models/");
let db = require("../database/models/");

const productsControllerAPI = {
  listado: async (req, res) => {
    const countByCategory = await db.Producto.findAll({
      include: [
        { association: "category", as: "category_name", attributes: ["name"] },
      ],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("category.name")), "id"],
      ],
      order: sequelize.literal("category_id DESC"),
      group: ["category.name"],
    });

    const countByMaker = await db.Producto.findAll({
      include: [{ association: "maker", attributes: ["name"] }],
      attributes: [[sequelize.fn("COUNT", sequelize.col("maker.name")), "id"]],
      order: sequelize.literal("maker_id DESC"),
      group: ["maker.name"],
    });

    const getAllProducts = await db.Producto.findAll();

    Promise.all([countByCategory, countByMaker, getAllProducts])
      .then((resp) => {
        let respuesta = {
          count: resp[2].length,
          countByCategory: {
            totalCategories: resp[0].length,
            data: resp[0].map((info) => {
              return {
                total_products: info.id,
                category_name: info.category.name,
              };
            }),
          },
          countByMaker: {
            totalMakers: resp[1].length,
            data: resp[1].map((info) => {
              return { total_products: info.id, maker_name: info.maker.name };
            }),
          },
          products: resp[2].map((info) => {
            return {
              id: info.id,
              name: info.name,
              description: info.description,
              price: info.price,
              detail: `https://ecotias.herokuapp.com${req.originalUrl}${info.id}`,
            };
          }),
        };
        res.json(respuesta);
      })
      .catch((err) => console.log(err));
  },
  detalle: async (req, res) => {
    await db.Producto.findByPk(req.params.id, {
      include: [
        { association: "category", attributes: ["name"] },
        { association: "maker", attributes: ["name"] },
      ],
    })
      .then((producto) => {
        let respuesta;
        if (producto) {
          if (producto.image === "" || producto.image === null) {
            respuesta = {
              meta: {
                status: 200,
                url: req.originalUrl,
              },
              data: {
                id: producto.id,
                name: producto.name,
                description: producto.description,
                price: producto.price,
                image:
                  "https://ecotias.herokuapp.com/images/productImages/default.jpg",
                additionalInfo: [
                  {
                    category: {
                      id: producto.category_id,
                      name: producto.category.name,
                    },
                    maker: { id: producto.maker_id, name: producto.maker.name },
                  },
                ],
              },
            };
            res.json(respuesta);
          } else if (producto.image.includes("http://dummyimage.com")) {
            respuesta = {
              meta: {
                status: 200,
                url: req.originalUrl,
              },
              data: {
                id: producto.id,
                name: producto.name,
                description: producto.description,
                price: producto.price,
                image: producto.image,
                additionalInfo: [
                  {
                    category: {
                      id: producto.category_id,
                      name: producto.category.name,
                    },
                    maker: { id: producto.maker_id, name: producto.maker.name },
                  },
                ],
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
                id: producto.id,
                name: producto.name,
                description: producto.description,
                price: producto.price,
                image: "https://ecotias.herokuapp.com" + producto.image,
                additionalInfo: [
                  {
                    category: {
                      id: producto.category_id,
                      name: producto.category.name,
                    },
                    maker: { id: producto.maker_id, name: producto.maker.name },
                  },
                ],
              },
            };
            res.json(respuesta);
          }
        } else {
          respuesta = {
            status: 404,
            msg: "El producto no existe",
          };
          res.json(respuesta);
        }
      })
      .catch((err) => console.log(err));
  },
};

module.exports = productsControllerAPI;
