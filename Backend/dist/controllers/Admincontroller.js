"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Usermodel_1 = require("../models/Usermodel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const HttpException_1 = __importDefault(require("../library/HttpException"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class AdminFunction {
}
exports.default = AdminFunction;
_a = AdminFunction;
AdminFunction.createUser = async (req, res, next) => {
    const { body } = req;
    const hashPassword = await bcryptjs_1.default.hash(req.body.password, 10);
    const chekemail = await Usermodel_1.User.findOne({ email: req.body.email });
    if (chekemail) {
        next(new HttpException_1.default(400, "Email already exists"));
    }
    else {
        const user = await Usermodel_1.User.create({
            ...body,
            password: hashPassword
        });
        try {
            // Créer un transporteur SMTP
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-email-password'
                }
            });
            // Configuration de l'email
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: user.email,
                subject: 'Welcome to My Application',
                text: `Your password for My Application is: ${req.body.password}, your role is: ${req.body.role}`
            };
            // Envoi de l'email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send('created successfully and email sent');
        }
        catch (_b) {
            next(new HttpException_1.default(400, "Error creating"));
        }
    }
};
AdminFunction.getUsers = async (req, res, next) => {
    try {
        const users = await Usermodel_1.User.find({});
        res.status(200).json(users);
    }
    catch (_b) {
        next(new HttpException_1.default(400, "Error fetching users"));
    }
};
AdminFunction.getUserById = async (req, res, next) => {
    try {
        const user = await Usermodel_1.User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            next(new HttpException_1.default(404, "User not found"));
        }
    }
    catch (_b) {
        next(new HttpException_1.default(400, "Error fetching user"));
    }
};
AdminFunction.updateUser = async (req, res, next) => {
    try {
        const user = await Usermodel_1.User.findByIdAndUpdate(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        }
        else {
            next(new HttpException_1.default(404, "User not found"));
        }
    }
    catch (_b) {
        next(new HttpException_1.default(400, "Error updating user"));
    }
};
AdminFunction.deleteUser = async (req, res, next) => {
    try {
        const user = await Usermodel_1.User.findByIdAndDelete(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            next(new HttpException_1.default(404, "User not found"));
        }
    }
    catch (_b) {
        next(new HttpException_1.default(400, "Error deleting user"));
    }
};
