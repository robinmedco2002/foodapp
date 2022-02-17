const deleteRouter = require("../routes/deleteRouter");
const {authMiddleware} = require("../middleware/authMiddleware");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Kitchen, Dish} = require("../models");

const handler = async (req, res) => {
    const {id} = req.body;

    await Kitchen.destroy({where: {id}});
    await Dish.destroy({where: {kitchen_id: id}})

    return res.json(success("Kitchen Deleted"));
};

deleteRouter.post("/chef/kitchen", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Kitchen Id is required")
]), wrapRequestHandler(handler));