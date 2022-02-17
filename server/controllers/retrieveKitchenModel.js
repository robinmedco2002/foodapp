const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Kitchen, Chef} = require("../models");
const {validate} = require("../helpers/validations");
const {authMiddleware} = require("../middleware/authMiddleware");
const {query} = require("express-validator");

const handler = async (req, res) => {
    const {id} = req.query;
    const kitchen = await Kitchen.findOne({
        where: {id}
    });
    res.json(success("success", {kitchen}));
};

retrieveRouter.get("/chef/kitchen-model", authMiddleware(), validate([
    query("id").notEmpty().withMessage("Kitchen Id is required")
]), wrapRequestHandler(handler));