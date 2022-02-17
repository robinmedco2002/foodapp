const {success} = require("../helpers/response");
const {getLoginTokenFromRequest} = require("../helpers");
const {authMiddleware} = require("../middleware/authMiddleware");
const apiRouter = require("../routes/apiRouter");
const {UserToken} = require("../models");

apiRouter.post("/logout", authMiddleware(), async (req, res) => {
    const token = await getLoginTokenFromRequest(req);
    await UserToken.destroy({where: {token: token.token}});

    return res.json(success("Logged Out"));
});