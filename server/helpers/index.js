const {compareSync, hashSync} = require("bcrypt");
const {UserToken, Employee, EmployeeToken, Permission, DeliveryUserToken, ChefToken} = require("../models");
const {LOGIN_TOKEN} = require("../constants");
const {error} = require("../helpers/response");
const {v4: uuidv4} = require("uuid");
const sequelize = require("sequelize");

function encryptPassword(string) {
    return hashSync(string, 4);
}

function matchPasswords(encrypted, password) {
    return compareSync(password, encrypted);
}

const pagination = (data, limit, page) => {
    if (limit && !page) {
        return data.slice(0, limit);
    } else if (!limit && page) {
        const offset = 10 * (page - 1);
        return data.slice(offset, offset + 10);
    } else if (limit && page) {
        const offset = limit * (page - 1);
        return data.slice(offset, offset + Number(limit));
    } else {
        return data;
    }
};

const generateOtp = (length = 6) => {
    const number = Math.pow(10, length - 1);
    return String(Math.floor(number + Math.random() * 9 * number));
};

const generateToken = (length = 32) => {
    return uuidv4();
};

const referral_code = (length = 5) => {
    const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    const b = [];
    for (let i = 0; i < length; i++) {
        const j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
};

const getLoginTokenFromRequest = async (req) => {
    let {login_token} = req;

    if (!login_token) {
        let token_id = req.headers.authorization || req.query.token_id || "";
        token_id = token_id.replace("Bearer ", "");
        login_token = await UserToken.findOne({
            where: {
                token: token_id,
                type: LOGIN_TOKEN
            }
        });
    }

    return login_token;
};

const hasPermissionOrFail = async (req, value) => {
    const {employee_id} = await getELoginTokenFromRequest(req);
    const employee = await Employee.findOne({
        where: {id: employee_id},
        include: [{
            model: Permission,
            as: "permissions"
        }]
    });
    const check = await employee.permissions.find(({code}) => code == value);
    if (!check)
        throw new Error("You don't allowed for this actions");
    else
        return true;
};

module.exports = {
    encryptPassword,
    matchPasswords,
    pagination,
    referral_code,
    generateToken,
    generateOtp,
    getLoginTokenFromRequest,
    hasPermissionOrFail,
};