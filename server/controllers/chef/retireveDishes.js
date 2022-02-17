const retrieveRouter = require("../../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../../helpers/response");
const {Dish, Kitchen, User} = require("../../models");
const {authMiddleware} = require("../../middleware/authMiddleware");
const {Op} = require("sequelize");
const {pagination, getLoginTokenFromRequest} = require("../../helpers");

const handler = async (req, res) => {
    const {user_id} = await getLoginTokenFromRequest(req);
    const {search, page, limit} = req.query;

    const kitchen = await Kitchen.findOne({where: {chef_id: user_id}});
    let where = {};
    where.kitchen_id = kitchen.id
    if (search)
        where = {
            [Op.or]: [
                {name: {[Op.like]: "%" + search + "%"}},
            ]
        };

    const query = await Dish.findAll({
        where
    });

    res.json(success("success", {
        dishes: pagination(query, limit, page),
        total: query.length
    }));
};

retrieveRouter.get("/chef/dishes", authMiddleware(), wrapRequestHandler(handler));