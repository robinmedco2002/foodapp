const updateRouter = require("../routes/updateRouter");
const {validate, validateEmail} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {encryptPassword} = require("../helpers");
const {User} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");
const {Op} = require("sequelize");

const handler = async (req, res) => {
    const {id, name, email, zip_code, password, mobile, city, address} = req.body;

    const user = await User.findOne({where: {id, role_id: 4}});

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

    return res.json(success("User updated", {user}));
};

updateRouter.post("/admin/user", authMiddleware(), validate([
    body("id").notEmpty().withMessage("User Id is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required").custom(async (email, {req}) => {
        if (email) {
            if (!validateEmail(email))
                throw new Error("Please enter valid Email");

            const {id} = await req.body;
            const exists = await User.findOne({
                where: {
                    email,
                    role_id: 4,
                    id: {[Op.ne]: id}
                }
            });

            if (exists)
                throw new Error("Email already exists");
        }
        return true;
    }),
    body("zip_code").notEmpty().withMessage("Zip Code is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("confirm_password").notEmpty().withMessage("Confirm Password is required")
        .custom(async (confirm_password, {req}) => {
            const {password} = req.body;

            if (password !== confirm_password) {
                throw new Error("Confirm password should match password field.");
            }
        })
]), wrapRequestHandler(handler));