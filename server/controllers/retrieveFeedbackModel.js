const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Feedback} = require("../models");
const {validate} = require("../helpers/validations");
const {authMiddleware} = require("../middleware/authMiddleware");
const {query} = require("express-validator");

const handler = async (req, res) => {
    const {id} = req.query;
    const feedback = await Feedback.findOne({
        where: {id}
    });
    res.json(success("success", {feedback}));
};

retrieveRouter.get("/admin/feedback-model", authMiddleware(), validate([
    query("id").notEmpty().withMessage("Feedback Id is required")
]), wrapRequestHandler(handler));