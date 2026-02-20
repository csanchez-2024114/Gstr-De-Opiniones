import { body, param } from 'express-validator';
import { checkValidators } from '../middlewares/check-validators.js';

export const createCommentValidator = [
    body('text').notEmpty().withMessage('El texto del comentario es obligatorio'),
    body('publication').isMongoId().withMessage('ID de publicación inválido'),
    checkValidators
];

export const updateCommentValidator = [
    body('text').notEmpty().withMessage('El texto del comentario es obligatorio'),
    checkValidators
];

export const getByPublicationValidator = [
    param('pid').isMongoId().withMessage('ID de publicación inválido'),
    checkValidators
];
