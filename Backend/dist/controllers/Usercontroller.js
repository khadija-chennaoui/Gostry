"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Usermodel_1 = require("../models/Usermodel");
const config_1 = require("../config/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../library/HttpException"));
class UserAuthentication {
}
exports.default = UserAuthentication;
_a = UserAuthentication;
UserAuthentication.signUp = async (req, res, next) => {
    const { body } = req;
    const hashPassword = await bcryptjs_1.default.hash(req.body.password, 10);
    const chekemail = await Usermodel_1.User.findOne({ email: req.body.email });
    if (chekemail) {
        next(new HttpException_1.default(400, "Email earldy existe"));
    }
    else {
        const user = await Usermodel_1.User.create({
            ...body,
            role: 'Client',
            password: hashPassword
        });
        try {
            res.send('created succflly');
        }
        catch (_b) {
            next(new HttpException_1.default(400, "Error creating"));
        }
    }
};
UserAuthentication.login = async (req, res, next) => {
    const user = await Usermodel_1.User.findOne({ email: req.body.email });
    if (!user)
        next(new HttpException_1.default(400, "Email Not Found"));
    const password = await bcryptjs_1.default.compare(req.body.password, user.password);
    if (!password)
        next(new HttpException_1.default(400, "Password Not Found"));
    const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, config_1.config.token.token_secret);
    res.cookie('token', token);
    const { _id, username, email, role } = user;
    return res.status(200).send({ user: { _id, username, email, role } });
};
