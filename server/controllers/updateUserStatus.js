const updateRouter = require("../routes/updateRouter");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");

const handler = async (req, res) => {
    const {id, status} = req.body;

    const user = await User.findByPk(id);

    if (!user)
        throw new Error("User not found");

    user.is_active = status;
    await user.save();

    return res.json(success("User updated"));
};

updateRouter.post("/admin/user-status", authMiddleware(), validate([
    body("id").notEmpty().withMessage("User id is required"),
    body("status").notEmpty().withMessage("Status is required"),
]), wrapRequestHandler(handler));