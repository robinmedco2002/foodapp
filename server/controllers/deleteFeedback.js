const deleteRouter = require("../routes/deleteRouter");
const {authMiddleware} = require("../middleware/authMiddleware");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Feedback} = require("../models");

const handler = async (req, res) => {
    const {id} = req.body;

    await Feedback.destroy({where: {id}});

    return res.json(success("Feedback Deleted"));
};

deleteRouter.post("/admin/feedback", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Feedback Id is required")
]), wrapRequestHandler(handler));