import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const registerValidator = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('email').isEmail().withMessage('No es un correo válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    checkValidators
];

export const loginValidator = [
    body('loginIdentifier').notEmpty().withMessage('El correo o username es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    checkValidators
];