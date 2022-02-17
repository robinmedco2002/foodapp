require("dotenv").config();
require("url-search-params-polyfill");
const {error} = require("./helpers/response");
const {app} = require("./app");
require("moment-timezone");
const {HOST, PORT} = require("./constants");
const requireDir = require("require-dir");
const moment = require("moment");

global.navigator = () => null;
global.moment = moment;

requireDir("./controllers");
requireDir("./controllers/chef");
requireDir("./controllers/admin");
requireDir("./routes");

app.use(function (err, req, res, next){
    res.json(error(err.message));
});

app.listen(Number(PORT), HOST, async () => {
    console.log(`listening on ${HOST}:${PORT}`);
});
