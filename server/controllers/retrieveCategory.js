const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Category} = require("../models");
const {Op} = require("sequelize");
const {pagination, getLoginTokenFromRequest} = require("../helpers");

const handler = async (req, res) => {
    const user = await getLoginTokenFromRequest(req);
    const {search, page, limit, type, options} = req.query;

    let whereStatement = {};

    if (search) {
        whereStatement = {
            [Op.or]: [
                {name: {[Op.like]: "%" + search + "%"}},
            ]
        }
    }

    if (type)
        whereStatement.type = type;

    if (user?.user_id)
        if (user?.user_id !== 1 && options)
            whereStatement.type = "sub-category";

    const query = await Category.findAll({
        where: whereStatement
    });

    res.json(success("success", {
        categories: pagination(query, limit, page),
        total: query.length
    }));
};

retrieveRouter.get("/categories", wrapRequestHandler(handler));