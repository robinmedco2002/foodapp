const {error} = require("../helpers/response");
const {UserToken, User} = require("../models");
const {LOGIN_TOKEN} = require("../constants");

const authMiddleware = () => async (req, res, next) => {
    let token_id = req.headers.authorization || req.query.token_id || "";

    token_id = token_id.replace("Bearer ", "");

    const errorMessage = "Invalid Token or Token Expired";

    if (!token_id)
        return res.json(error(errorMessage));

    const token = await UserToken.findOne({
        where: {
            token: token_id,
            type: LOGIN_TOKEN
        },
        include: [{
            model: User,
            as: "user"
        }]
    });

    if (!token || !token.user)
        return res.json(error(errorMessage));

    const {user} = token;

    if (!user.is_active)
        return res.json({
            ...error("Your account is not active."),
            user_disabled: true
        });

    req.login_token = token;

    next();
};

module.exports = {authMiddleware};