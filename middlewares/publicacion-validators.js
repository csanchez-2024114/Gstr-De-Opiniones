import { body } from 'express-validator';
import { checkValidators } from '../middlewares/check-validators.js';

export const publicacionValidator = [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('category').notEmpty().withMessage('La categoría es obligatoria'),
    body('text').notEmpty().withMessage('El texto es obligatorio'),
    checkValidators
];
