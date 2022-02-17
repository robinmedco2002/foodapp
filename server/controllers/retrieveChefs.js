const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User, Dish, Kitchen, Category} = require("../models");
const {Op} = require("sequelize");
const {pagination} = require("../helpers");

const handler = async (req, res) => {
    const {limit = 6, page = 1} = req.query;

    let where = {};
    where.role_id = 2;
    where.is_active = true;
    where.is_approve = true;

    const query = await User.findAll({
        where,
        attributes: ["id", "name", "image"],
        include: [{
            model: Kitchen,
            as: "kitchen",
            include: [
                {model: Dish, as: "dish"},
                {model: Category, as: "main_category", attributes: ["name"]},
                {model: Category, as: "sub_category", attributes: ["name"]}
            ]
        }]
    });

    res.json(success("success", {
        chefs: pagination(query, limit, page),
        total: query.length
    }));
};

retrieveRouter.get("/chefs", wrapRequestHandler(handler));
