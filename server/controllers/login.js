const apiRouter = require("../routes/apiRouter");
const {validate} = require("../helpers/validations");
const {body} = require("express-validator");
const {success, error, wrapRequestHandler, messages} = require("../helpers/response");
const {User, UserToken, Role, Permission} = require("../models");
const {matchPasswords, generateToken} = require("../helpers");
const {LOGIN_TOKEN} = require("../constants");
const {Op} = require("sequelize");

const handler = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({
        where: {
            [Op.or]: [
                {
                    mobile: username
                },
                {
                    email: username
                }
            ]
        }
    });

    if (!user)
        return res.json(error(messages().user_not_found));

    if (!matchPasswords(user.password, password))
        return res.json(error(messages().invalid_password));

    if (!user.is_active)
        return res.json(error(messages().account_disabled));

    if (!user.is_approve)
        return res.json(error(messages().account_disabled));

    const tok = await UserToken.create({
        user_id: user.id,
        token: generateToken(),
        type: LOGIN_TOKEN
    });

    const token = await UserToken.findOne({
        where: {id: tok.id},
        include: [{
            model: User,
            as: "user",
            include: [{
                model: Role,
                as: "role"
            }, {
                model: Permission,
                as: "permissions"
            }]
        }]
    });

    return res.json(success(messages().logged_in, token));
};

apiRouter.post("/login", validate([
    body("username").notEmpty().withMessage("Mobile/Email is required"),
    body("password").notEmpty().withMessage("Password is Required")
]), wrapRequestHandler(handler));