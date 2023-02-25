"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admincontroller_1 = __importDefault(require("../controllers/Admincontroller"));
const adminRoute = express_1.default.Router();
adminRoute.post('/creatuser', Admincontroller_1.default.createUser);
adminRoute.get('/getall', Admincontroller_1.default.getUsers);
adminRoute.get('/getby/:id', Admincontroller_1.default.getUserById);
adminRoute.put('/updateuser/:id', Admincontroller_1.default.updateUser);
adminRoute.delete('/deleteuser/:id', Admincontroller_1.default.deleteUser);
exports.default = adminRoute;
