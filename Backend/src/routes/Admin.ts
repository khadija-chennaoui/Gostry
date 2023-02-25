import express from "express";
import AdminFunction from "../controllers/Admincontroller";
import { UserSigninValidator } from "../middlewares/userValidator";

const adminRoute : any = express.Router();  

adminRoute.post('/creatuser', AdminFunction.createUser)
adminRoute.get('/getall', AdminFunction.getUsers)
adminRoute.get('/getby/:id', AdminFunction.getUserById)
adminRoute.put('/updateuser/:id', AdminFunction.updateUser)
adminRoute.delete('/deleteuser/:id', AdminFunction.deleteUser)

export default adminRoute

