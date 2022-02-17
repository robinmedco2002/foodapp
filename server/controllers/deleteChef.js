const deleteRouter = require("../routes/deleteRouter");
const {authMiddleware} = require("../middleware/authMiddleware");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User} = require("../models");

const handler = async (req, res) => {
    const {id} = req.body;

    await User.destroy({where: {id, role_id: 2}});

    return res.json(success("Chef deleted"));
};

deleteRouter.post("/admin/chef", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Chef Id is required")
]), wrapRequestHandler(handler));