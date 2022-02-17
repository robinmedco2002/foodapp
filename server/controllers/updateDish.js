const updateRouter = require("../routes/updateRouter");
const {validate, validatePhone, validateEmail} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Dish, Kitchen} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");
const {getLoginTokenFromRequest} = require("../helpers");

const handler = async (req, res) => {
    const {user_id} = await getLoginTokenFromRequest(req);
    const {id, name, image, status, about, price, ingredients, portion_size, preparation_time} = req.body;

    const kitchen = await Kitchen.findOne({chef_id: user_id});

    if (!kitchen)
        throw new Error("Kitchen not found please Add Kitchen");


    const dish = await Dish.findOne({id, kitchen_id: kitchen.id});
    if (!dish)
        throw new Error("Dish not found");

    dish.name = name;
    dish.status = status;
    dish.about = about;
    dish.price = price;
    dish.ingredients = ingredients;
    dish.portion_size = portion_size;
    dish.preparation_time = preparation_time;

    await dish.save();

    return res.json(success("Dish Updated"));
};

updateRouter.post("/chef/dish", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Dish ID is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("image").notEmpty().withMessage("Image is required"),
    body("about").notEmpty().withMessage("About is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("ingredients").notEmpty().withMessage("Ingredients is required"),
    body("portion_size").notEmpty().withMessage("Portion Size is required"),
    body("preparation_time").notEmpty().withMessage("Preparation Time is required"),
    // body("status").notEmpty().withMessage("Status is required")
]), wrapRequestHandler(handler));