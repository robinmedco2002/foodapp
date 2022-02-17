const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Feedback} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");
const {Op} = require("sequelize");
const {pagination} = require("../helpers");

const handler = async (req, res) => {
    const {search, page, limit, type} = req.query;

    let whereStatement = {};

    if (search) {
        whereStatement = {
            [Op.or]: [
                {type: {[Op.like]: "%" + search + "%"}},
                {name: {[Op.like]: "%" + search + "%"}},
                {mobile: {[Op.like]: "%" + search + "%"}},
                {email: {[Op.like]: "%" + search + "%"}},
                {address: {[Op.like]: "%" + search + "%"}}
            ]
        }
    }

    if (type)
        whereStatement.type = type

    const query = await Feedback.findAll({
        where: whereStatement
    });

    res.json(success("success", {
        feedbacks: pagination(query, limit, page),
        total: query.length
    }));
};

retrieveRouter.get("/admin/feedbacks", authMiddleware(), wrapRequestHandler(handler));