const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Kitchen, User} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");
const {Op} = require("sequelize");
const {pagination, getLoginTokenFromRequest} = require("../helpers");

const handler = async (req, res) => {
    const {user_id} = await getLoginTokenFromRequest(req);
    const {search, page, limit} = req.query;

    let whereStatement = {};

    if (search) {
        whereStatement = {
            [Op.or]: [
                {name: {[Op.like]: "%" + search + "%"}},
                {address: {[Op.like]: "%" + search + "%"}}
            ]
        }
    }

    if (user_id !== 1) {
        whereStatement.chef_id = user_id;
    }

    const query = await Kitchen.findAll({
        where: whereStatement,
        include: [{model: User, as: "chef"}]
    });

    res.json(success("success", {
        kitchens: pagination(query, limit, page),
        total: query.length
    }));
};

retrieveRouter.get("/chef/kitchens", authMiddleware(), wrapRequestHandler(handler));