const updateRouter = require("../routes/updateRouter");
const {validate, validatePhone} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {encryptPassword} = require("../helpers");
const {User} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");
const {Op} = require("sequelize");

const handler = async (req, res) => {
    const {id, name, mobile, email, state, city, address, zip_code, password} = req.body;

    const user = await User.findOne({where: {id, role_id: 2}});

    if (!user)
        throw new Error("User not found");

    user.name = name;
    user.email = email;
    user.mobile = mobile;
    user.password = encryptPassword(password);
    user.zip_code = zip_code;
    user.state = state;
    user.city = city;
    user.address = address;

    await user.save();

    return res.json(success("Chef updated", {user}));
};

updateRouter.post("/admin/chef", authMiddleware(), validate([
    body("id").notEmpty().withMessage("User Id is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("mobile").notEmpty().withMessage("Mobile is required").custom(async (mobile, {req}) => {
        if (mobile) {
            if (!validatePhone(mobile))
                throw new Error("Please enter valid Mobile Number");

            const {id} = req.body;

            const exists = await User.findOne({where: {mobile, role_id: 2, id: {[Op.ne]: id}}});

            if (exists)
                throw new Error("Mobile Number already exists");
        }
        return true;
    }),
    body("state").notEmpty().withMessage("State is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("confirm_password").notEmpty().withMessage("Confirm Password is required")
        .custom(async (confirm_password, {req}) => {
            const {password} = req.body;
            if (confirm_password)
                if (password !== confirm_password) {
                    throw new Error("Confirm password should match password field.");
                }
            return true;
        })
]), wrapRequestHandler(handler));