const express = require("express");
const os = require("os");
const {postTrimmer} = require("./helpers/validations");
const useragent = require("express-useragent");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const Razorpay = require("razorpay");
const app = express();
const {RAZORPAY_KEY_SECRET, RAZORPAY_KEY_ID} = require("./constants");

// const razorpay = new Razorpay({
//     key_id: RAZORPAY_KEY_ID,
//     key_secret: RAZORPAY_KEY_SECRET,
// });

module.exports = {
    app,
    // razorpay
};

app.get("/kitchen-img/*", (req, res) => {
    res.sendfile("./public/kitchen-img/" + req.params[0]);
});

app.get("/category-img/*", (req, res) => {
    res.sendfile("./public/category-img/" + req.params[0]);
});

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
    preserveExtension: true,
    parseNested: true
}));

app.use((req, res, next) => {
    req.body = {
        ...req.body,
        ...req.files
    };
    next();
});

app.use(express.json());

app.use(useragent.express());

app.use(postTrimmer);

app.use(cors());

app.use(express.static("build"));
app.set("build", "./build");
