const updateRouter = require("../../routes/updateRouter");
const {validate} = require("../../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../../helpers/response");
const {Kitchen} = require("../../models");
const {authMiddleware} = require("../../middleware/authMiddleware");
const {getLoginTokenFromRequest} = require("../../helpers");
const path = require("path");

const handler = async (req, res) => {
    const {user_id} = await getLoginTokenFromRequest(req);
    const {id, name, main_category_id, sub_category_id, image, status, delivery_option, open_time, close_time, address, zip_code, about} = req.body;

    const kitchen = await Kitchen.findOne({id, chef_id: user_id});
    if (!kitchen) {
        throw new Error("Kitchen not found");
    }

    if (user_id === 1)
        kitchen.name = name;

    kitchen.status = status;
    kitchen.main_category_id = main_category_id;
    kitchen.sub_category_id = sub_category_id;
    kitchen.delivery_option = delivery_option;
    kitchen.open_time = open_time;
    kitchen.close_time = close_time;
    kitchen.address = address;
    kitchen.zip_code = zip_code;
    kitchen.about = about;

    if (image) {
        const fileName = image.md5 + +new Date + user_id;
        const extension = path.extname(image.name);
        await image.mv("./public/kitchen-img/" + fileName + extension);
        kitchen.image = "kitchen-img/" + fileName + extension
    }

    await kitchen.save();

    return res.json(success("Kitchen Updated"));
};

updateRouter.post("/chef/kitchen", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Kitchen Id is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("main_category_id").notEmpty().withMessage("Main Category is required"),
    body("sub_category_id").notEmpty().withMessage("Sub Category is required"),
    // body("image").notEmpty().withMessage("Image is required"),
    body("status").notEmpty().withMessage("Status is required"),
    body("delivery_option").notEmpty().withMessage("Delivery Option is required"),
    body("open_time").notEmpty().withMessage("Open Time is required"),
    body("close_time").notEmpty().withMessage("Close Time is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("zip_code").notEmpty().withMessage("Pin Code is required"),
    body("about").notEmpty().withMessage("About is required"),
]), wrapRequestHandler(handler));