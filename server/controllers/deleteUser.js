const deleteRouter = require("../routes/deleteRouter");
const {authMiddleware} = require("../middleware/authMiddleware");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User} = require("../models");

const handler = async (req, res) => {
    const {id} = req.body;

    if (id === 1) {
        throw new Error("Super Admin is not deleted");
    }

    await User.destroy({where: {id}});

    return res.json(success("Record Deleted"));
};

deleteRouter.post("/admin/user", authMiddleware(), validate([
    body("id").notEmpty().withMessage("User Id is required")
]), wrapRequestHandler(handler));