const createRouter = require("../routes/createRouter");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Category} = require("../models");
const path = require("path");
const {getLoginTokenFromRequest} = require("../helpers");

const handler = async (req, res) => {
    const {user_id} = await getLoginTokenFromRequest(req);
    const {name, image, mouse_over_image, type} = req.body;

    const images = [];
    if (type === "main-category") {
        const imgArray = [image, mouse_over_image];
        await Promise.all(imgArray.map(async (item) => {
            const fileName = item.md5 + +new Date + user_id;
            const extension = path.extname(item.name);
            images.push("category-img/" + fileName + extension);
            await item.mv("./public/category-img/" + fileName + extension);
        }));
    }

    const category = Category.build({
        name,
        type,
        image: type === "main-category" ? images[0] : null,
        mouse_over_image: type === "main-category" ? images[1] : null,
    });

    await category.save();

    return res.json(success("Category Created", {category}));
};

createRouter.post("/category", validate([
    body("type").notEmpty().withMessage("Type is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("image").custom((image, {req}) => {
        const {type} = req.body;
        if (type === "main-category" && !image)
            throw new Error("Image is required");

        return true;
    }),
    body("mouse_over_image").custom((image, {req}) => {
        const {type} = req.body;
        if (type === "main-category" && !image)
            throw new Error("Mouse Over Image is required");

        return true;
    })
]), wrapRequestHandler(handler));