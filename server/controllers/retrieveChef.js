const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User, Dish, Kitchen} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");
const {Op} = require("sequelize");
const {pagination} = require("../helpers");
const {validate} = require("../helpers/validations");
const {query} = require("express-validator");

const handler = async (req, res) => {
    const {id} = req.query;

    let where = {};
    where.id = id;
    where.role_id = 2;
    where.is_active = true;
    where.is_approve = true;

    const query = await User.findOne({
        where,
        attributes: ["id", "name", "image"],
        include: [{
            model: Kitchen,
            as: "kitchen",
            include: [{model: Dish, as: "dish"}]
        }]
    });

    if (!query)
        throw new Error("Chef Not found");

    res.json(success("success", {
        chef: query,
    }));
};

retrieveRouter.get("/chef", authMiddleware(), validate([
    query("id").notEmpty().withMessage("Chef Id is required")
]), wrapRequestHandler(handler));