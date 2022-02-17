const retrieveRouter = require("../routes/retrieveRouter");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User, Role} = require("../models");
const {validate} = require("../helpers/validations");
const {authMiddleware} = require("../middleware/authMiddleware");
const {query} = require("express-validator");

const handler = async (req, res) => {
    const {id} = req.query;
    const user = await User.findOne({
        where: {id},
        include: [{model: Role, as: "role"}]
    });
    user.password = "";
    res.json(success("success", {user}));
};

retrieveRouter.get("/admin/user-model", authMiddleware(), validate([
    query("id").notEmpty().withMessage("User Id is required")
]), wrapRequestHandler(handler));