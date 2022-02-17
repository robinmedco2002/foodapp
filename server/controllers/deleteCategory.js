const deleteRouter = require("../routes/deleteRouter");
const {authMiddleware} = require("../middleware/authMiddleware");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Category} = require("../models");

const handler = async (req, res) => {
    const {id} = req.body;

    await Category.destroy({where: {id}});

    return res.json(success("Category Deleted"));
};

deleteRouter.post("/category", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Category Id is required")
]), wrapRequestHandler(handler));