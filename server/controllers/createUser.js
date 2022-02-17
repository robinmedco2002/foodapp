const createRouter = require("../routes/createRouter");
const {validate, validateEmail, validatePhone} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {encryptPassword} = require("../helpers");
const {User} = require("../models");
const path = require("path");

const handler = async (req, res) => {
    const {type, image, name, email, mobile, state, city, address, zip_code, password} = req.body;

    let fileName = "";
    let extension = "";

    if (image) {
        fileName = image.md5 + +new Date;
        extension = path.extname(image.name);
        await image.mv("./public/user-img/" + fileName + extension);
    }

    const user = User.build({
        name,
        mobile,
        email,
        image: "user-img/" + fileName + extension,
        password: type === "delivery-user" ? "" : encryptPassword(password),
        zip_code,
        state,
        city,
        address,
        role_id: type === "chef" ? 2 : type === "delivery-user" ? 3 : type === "customer" ? 4 : null,
        is_approve: type === "customer",
        is_active: type === "customer"
    });

    await user.save();

    return res.json(success("Register Successfully"));
}

createRouter.post("/user", validate([
    body("type").notEmpty().withMessage("Type is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("image").custom((image, {req}) => {
        const {type} = req.body;

        if ((type === "chef" || type === "delivery-user") && !image)
            throw new Error("Image is required");

        return true;
    }),
    body("mobile").custom(async (mobile, {req}) => {
        const {type} = req.body;

        if ((type === "chef" || type === "delivery-user") && !mobile)
            throw new Error("Mobile is required");

        if (mobile) {
            if (!validatePhone(mobile))
                throw new Error("Please enter valid Mobile Number");

            const exists = await User.findOne({where: {mobile, role_id: 2}});

            if (exists)
                throw new Error("Mobile Number already exists");
        }
        return true;
    }),
    body("email").custom(async (email, {req}) => {
        const {type} = req.body;

        if (type === "customer" && !email)
            throw new Error("Email is required");

        if (type === "customer" && email) {
            if (!validateEmail(email))
                throw new Error("Please enter valid Email");

            const exists = await User.findOne({where: {email, role_id: 4}});

            if (exists)
                throw new Error("Email already exists");
        }
        return true;
    }),
    body("zip_code").custom((zip_code, {req}) => {
        const {type} = req.body;
        if (type === "customer" && !zip_code)
            throw new Error("Zip Code is required");
        return true;
    }),
    body("state").custom((state, {req}) => {
        const {type} = req.body;
        if ((type === "chef" || type === "delivery-user") && !state)
            throw new Error("State is required")

        return true;
    }),
    body("city").custom((city, {req}) => {
        const {type} = req.body;
        if ((type === "chef" || type === "delivery-user") && !city)
            throw new Error("City is required")

        return true;
    }),
    body("password").custom((password, {req}) => {
        const {type} = req.body;
        if ((type === "chef" || type === "customer") && !password)
            throw new Error("Password is required");
        return true;
    }),
    body("confirm_password")
        .custom(async (confirm_password, {req}) => {
            const {type, password} = req.body;

            if ((type === "chef" || type === "customer") && !confirm_password)
                throw new Error("Confirm Password is required");

            if (password !== confirm_password) {
                throw new Error("Confirm password should match password field.");
            }

            return true;
        }),
    body("address").custom((address, {req}) => {
        const {type} = req.body;
        if ((type === "chef" || type === "delivery-user") && !address)
            throw new Error("Address is required")

        return true;

    }),
]), wrapRequestHandler(handler));