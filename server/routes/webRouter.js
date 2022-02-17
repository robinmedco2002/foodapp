const {app} = require("../app");
const {wrapRequestHandler} = require("../helpers/response");

app.get("/*", wrapRequestHandler(async (req, res) => {
    res.sendfile("./build/index.html");
}));