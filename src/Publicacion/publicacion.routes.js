import { Router } from 'express';
import {
    createPublication,
    listPublications,
    getPublicationById,
    updatePublication,
    deletePublication
} from './publicacion.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { publicacionValidator } from '../../middlewares/publicacion-validators.js';

const router = Router();


router.get('/', listPublications);
router.get('/:id', getPublicationById);


router.post('/', [validateJWT, publicacionValidator], createPublication);
router.put('/:id', [validateJWT, publicacionValidator], updatePublication);
router.delete('/:id', validateJWT, deletePublication);

export default router;
