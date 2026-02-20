import { Router } from 'express';
import {
    createComment,
    listComments,
    updateComment,
    deleteComment
} from './comentario.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import {
    createCommentValidator,
    updateCommentValidator,
    getByPublicationValidator
} from '../../middlewares/comentario-validators.js';

const router = Router();

router.post('/', [validateJWT, createCommentValidator], createComment);
router.get('/publication/:pid', [getByPublicationValidator], listComments);
router.put('/:id', [validateJWT, updateCommentValidator], updateComment);
router.delete('/:id', [validateJWT], deleteComment);

export default router;
