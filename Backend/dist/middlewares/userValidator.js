"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSigninValidator = void 0;
const UserSigninValidator = (req, res, next) => {
    req.check('email', 'Email is required').notEmpty()
        .isEmail()
        .withMessage('Email is invalid');
    req.check('password', 'Password is required').notEmpty()
        .isLength({ min: 5, max: 20 })
        .withMessage('Password must be between 8 and 20 characters');
    const errors = req.validationErrors();
    if (errors)
        return res.status(400).send({
            error: errors[0].msg
        });
    next();
};
exports.UserSigninValidator = UserSigninValidator;
