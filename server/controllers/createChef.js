const createRouter = require("../routes/createRouter");
const {validate, validatePhone} = require("../helpers/validations");
const {body} = require("express-validator");
const {encryptPassword} = require("../helpers/index");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User} = require("../models");

const handler = async (req, res) => {
    const {name, email, mobile, zip_code, state, city, address, password} = req.body;

    const user = User.build({
        name,
        email,
        mobile,
        state,
        city,
        zip_code,
        address,
        role_id: 2,
        password: encryptPassword(password)
    });

    await user.save();

    return res.json(success("Chef Created", {user}));
};

createRouter.post("/chef", validate([
    body("name").notEmpty().withMessage("Name is required"),
    body("mobile").notEmpty().withMessage("Mobile is required").custom(async (mobile) => {
        if (mobile) {
            if (!validatePhone(mobile))
                throw new Error("Please enter valid Mobile Number");

            const exists = await User.findOne({where: {mobile, role_id: 2}});

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