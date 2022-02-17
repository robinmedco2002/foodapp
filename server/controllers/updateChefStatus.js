const updateRouter = require("../routes/updateRouter");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Chef} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");

const handler = async (req, res) => {
    const {id, status} = req.body;

    const chef = await Chef.findByPk(id);

    if (!chef)
        throw new Error("User not found");

    chef.is_active = status;
    await chef.save();

    return res.json(success("Chef Updated"));
};

updateRouter.post("/admin/chef-status", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Chef id is required"),
    body("status").notEmpty().withMessage("Status is required"),
]), wrapRequestHandler(handler));