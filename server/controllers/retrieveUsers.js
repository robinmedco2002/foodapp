const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User, Role} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");
const {Op} = require("sequelize");
const {pagination} = require("../helpers");

const handler = async (req, res) => {
    const {search, page, limit, role, type} = req.query;

    let whereStatement = {};
    whereStatement.role_id = {[Op.ne]: 1}
    whereStatement.is_approve = true;

    if (search) {
        whereStatement = {
            [Op.or]: [
                {name: {[Op.like]: "%" + search + "%"}},
                {email: {[Op.like]: "%" + search + "%"}},
                {mobile: {[Op.like]: "%" + search + "%"}},
                {state: {[Op.like]: "%" + search + "%"}},
                {city: {[Op.like]: "%" + search + "%"}},
                {address: {[Op.like]: "%" + search + "%"}}
            ],
        }
    }

    if (role)
        whereStatement.role_id = role;

    if (type === "pending")
        whereStatement.is_approve = false;

    const query = await User.findAll({
        where: whereStatement,
        include: [{model: Role, as: "role"}]
    });

    res.json(success("success", {
        users: pagination(query, limit, page),
        total: query.length
    }));
};

retrieveRouter.get("/admin/users", authMiddleware(), wrapRequestHandler(handler));