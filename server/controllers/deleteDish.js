const deleteRouter = require("../routes/deleteRouter");
const {authMiddleware} = require("../middleware/authMiddleware");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Dish} = require("../models");

const handler = async (req, res) => {
    const {id} = req.body;

    await Dish.destroy({where: {id}});

    return res.json(success("Dish Deleted"));
};

deleteRouter.post("/chef/dish", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Dish Id is required")
]), wrapRequestHandler(handler));