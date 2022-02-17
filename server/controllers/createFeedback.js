const createRouter = require("../routes/createRouter");
const {validate, validatePhone, validateEmail} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Feedback} = require("../models");

const handler = async (req, res) => {
    const {name, email, subject, mobile, description, address, type} = req.body;

    const feedback = Feedback.build({
        type,
        name,
        email,
        mobile,
        subject,
        description,
        address,
    });

    await feedback.save();

    return res.json(success("Feedback Sent"));
};

createRouter.post("/feedback", validate([
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required").custom(async (email) => {
        if (email) {
            if (!validateEmail(email))
                throw new Error("Please enter valid Email");
        }
        return true;
    }),
    body("subject").notEmpty().withMessage("Subject/Topic is required"),
    body("mobile").notEmpty().withMessage("Mobile is required").custom(async (mobile) => {
        if (mobile) {
            if (!validatePhone(mobile))
                throw new Error("Please enter valid Mobile Number");
        }
        return true;
    }),
    body("description").notEmpty().withMessage("Describe Feedback is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("type").notEmpty().withMessage("Type is required")
]), wrapRequestHandler(handler));