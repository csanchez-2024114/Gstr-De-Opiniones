import { Router } from "express";
import {createField} from "./field.controller.js";
import { validateCreateField } from "../../middlewares/field-validator.js";

const router = Router();

router.post(
  '/',
  uploadFieldImage.single('image'),
    cleanupUploadedFileOnFinish,
    validateCreateField,
    createField  
);

export default router;