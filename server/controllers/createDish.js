const createRouter = require("../routes/createRouter");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Dish, Kitchen} = require("../models");
const {getLoginTokenFromRequest } = require("../helpers");
const {authMiddleware} = require("../middleware/authMiddleware");

const handler = async (req, res) => {
    const {user_id} = await getLoginTokenFromRequest(req);
    const {name, image, status, about, price, ingredients, portion_size, preparation_time} = req.body;

    const kitchen = await Kitchen.findOne({chef_id: user_id});

    if (!kitchen)
        throw new Error("Kitchen not found please Add Kitchen");

    const dish = Dish.build({
        kitchen_id: kitchen.id,
        name,
        status,
        about,
        price,
        ingredients,
        portion_size,
        preparation_time
    });

    await dish.save();

    return res.json(success("Dish Created"));
};

createRouter.post("/chef/dish", authMiddleware(), validate([
    body("name").notEmpty().withMessage("Name is required"),
    body("image").notEmpty().withMessage("Image is required"),
    body("about").notEmpty().withMessage("About is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("ingredients").notEmpty().withMessage("Ingredients is required"),
    body("portion_size").notEmpty().withMessage("Portion Size is required"),
    body("preparation_time").notEmpty().withMessage("Preparation Time is required"),
    // body("status").notEmpty().withMessage("Status is required")
]), wrapRequestHandler(handler));