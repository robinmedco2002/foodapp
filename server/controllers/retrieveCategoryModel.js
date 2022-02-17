const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Category} = require("../models");
const {validate} = require("../helpers/validations");
const {authMiddleware} = require("../middleware/authMiddleware");
const {query} = require("express-validator");

const handler = async (req, res) => {
    const {id} = req.query;
    const category = await Category.findOne({
        where: {id},
    });
    res.json(success("success", {category}));
};

retrieveRouter.get("/category-model", authMiddleware(), validate([
    query("id").notEmpty().withMessage("Category Id is required")
]), wrapRequestHandler(handler));