const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Dish} = require("../models");
const {validate} = require("../helpers/validations");
const {authMiddleware} = require("../middleware/authMiddleware");
const {query} = require("express-validator");

const handler = async (req, res) => {
    const {id} = req.query;
    const dish = await Dish.findOne({
        where: {id},
    });
    res.json(success("success", {dish}));
};

retrieveRouter.get("/chef/dish-model", authMiddleware(), validate([
    query("id").notEmpty().withMessage("Dish Id is required")
]), wrapRequestHandler(handler));