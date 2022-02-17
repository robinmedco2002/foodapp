const retrieveRouter = require("../../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../../helpers/response");
const {Dish, Kitchen, User} = require("../../models");
const {authMiddleware} = require("../../middleware/authMiddleware");
const {Op} = require("sequelize");
const {pagination, getLoginTokenFromRequest} = require("../../helpers");

const handler = async (req, res) => {
    const {search, page, limit} = req.query;

    const query = Dish.findAll({
        where: {
            [Op.or]: [
                {name: {[Op.like]: "%" + search + "%"}},
            ]
        },
        include: [{
            model: Kitchen,
            as: "kitchen",
            include: [{
                model: User,
                as: "chef"
            }]
        }]
    });

    const dishes = await query;

    res.json(success("success", {
        dishes: pagination(dishes, limit, page),
        total: dishes.length
    }));
};

retrieveRouter.get("/admin/dishes", authMiddleware(), wrapRequestHandler(handler));