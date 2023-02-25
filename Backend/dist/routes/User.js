"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Usercontroller_1 = __importDefault(require("../controllers/Usercontroller"));
const route = express_1.default.Router();
route.post('/signup', Usercontroller_1.default.signUp);
route.post('/signin', Usercontroller_1.default.login);
exports.default = route;
