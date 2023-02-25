import { NextFunction, Request, Response } from 'express';
import { User } from '../models/Usermodel';
import { config } from '../config/config'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import HttpException from '../library/HttpException';
import nodemailer from 'nodemailer';

export default class AdminFunction {

    public static createUser = async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        const hashPassword : any = await bcrypt.hash(req.body.password, 10);
        const chekemail = await User.findOne({ email: req.body.email });
        if (chekemail) {
            next(new HttpException(400, "Email already exists"));
        } else {
            const user = await User.create({
                ...body,
                password: hashPassword
            });
            try {
                // Créer un transporteur SMTP
                const transporter = nodemailer.createTransport({
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
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.send('created successfully and email sent');
            } catch {
                next(new HttpException(400, "Error creating"));
            }
        }
    }

    public static getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch {
            next(new HttpException(400, "Error fetching users"));
        }
    }

    public static getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                next(new HttpException(404, "User not found"));
            }
        } catch {
            next(new HttpException(400, "Error fetching user"));
        }
    }

    public static updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body);
            if (user) {
                res.status(200).json(user);
            } else {
                next(new HttpException(404, "User not found"));
            }
        } catch {
            next(new HttpException(400, "Error updating user"));
        }
    }

    public static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                next(new HttpException(404, "User not found"));
            }
        } catch {
            next(new HttpException(400, "Error deleting user"));
        }
    }
}
