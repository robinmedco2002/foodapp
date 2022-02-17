const updateRouter = require("../routes/updateRouter");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");

const handler = async (req, res) => {
    const {id, type} = req.body;

    const user = await User.findByPk(id);

    if (!user)
        throw new Error("User not found");

    if (type === "approve") {
        user.is_approve = true;
        user.is_active = true;
        await user.save();
    } else if (type === "reject")
        await user.destroy();

    return res.json(success(`User ${type === "approve" ? "Approved" : "Rejected"}`));
};

updateRouter.post("/admin/user-approve-status", authMiddleware(), validate([
    body("id").notEmpty().withMessage("User id is required"),
    body("type").notEmpty().withMessage("Type is required"),
]), wrapRequestHandler(handler));