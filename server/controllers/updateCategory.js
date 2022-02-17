const updateRouter = require("../routes/updateRouter");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, wrapRequestHandler} = require("../helpers/response");
const {Category} = require("../models");
const {authMiddleware} = require("../middleware/authMiddleware");
const path = require("path");
const {getLoginTokenFromRequest} = require("../helpers");

const handler = async (req, res) => {
        const {user_id} = await getLoginTokenFromRequest(req);
        const {id, name, image, mouse_over_image, type} = req.body;

        const category = await Category.findOne({where: {id}});

        if (!category)
            throw new Error("User not found");

        if (type === "main-category") {
            if (image || mouse_over_image) {
                const images = [];

                const imgArray = [image, mouse_over_image];
                await Promise.all(imgArray.map(async (item, i) => {
                        if (item) {
                            const fileName = item.md5 + +new Date + user_id;
                            const extension = path.extname(item.name);
                            images[i] = "category-img/" + fileName + extension;
                            await item.mv("./public/category-img/" + fileName + extension);
                        }
                    }
                ));

                category.image = images[0]
                category.mouse_over_image = images[1];
            }
        }

        category.name = name;
        category.type = type;

        await category.save();

        return res.json(success("Category updated", {category}));
    }
;

updateRouter.post("/category", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Category Id is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("type").notEmpty().withMessage("Type is required")
]), wrapRequestHandler(handler));