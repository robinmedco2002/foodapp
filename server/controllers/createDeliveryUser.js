const createRouter = require("../routes/createRouter");
const {validate, validatePhone} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {User} = require("../models");

const handler = async (req, res) => {
    const {name, email, mobile, zip_code, state, city, address} = req.body;

    const user = await User.build({
        name,
        email,
        mobile,
        state,
        zip_code,
        city,
        address,
        role_id: 3
    });

    await user.save();

    return res.json(success("Delivery User Created", {user}));
};

createRouter.post("/delivery-user", validate([
    body("name").notEmpty().withMessage("Name is required"),
    body("mobile").notEmpty().withMessage("Mobile Number is required").custom(async (mobile) => {
        if (mobile) {
            if (!validatePhone(mobile))
                throw new Error("Please enter valid Mobile Number");

            const exists = await User.findOne({where: {mobile, role_id: 3}});

            if (exists)
                throw new Error("Mobile Number already exists");
        }
        return true;
    }),
    body("state").notEmpty().withMessage("State is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("address").notEmpty().withMessage("Address is required")
]), wrapRequestHandler(handler));