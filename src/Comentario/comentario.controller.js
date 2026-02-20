import Comentario from './comentario.model.js';
import Publicacion from '../Publicacion/publicacion.model.js';

export const createComment = async (req, res) => {
    try {
        const { text, publication } = req.body;
        const author = req.user._id;

        const pub = await Publicacion.findById(publication);
        if (!pub) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        const comentario = await Comentario.create({
            text,
            author,
            publication
        });

        return res.status(201).json({
            success: true,
            message: 'Comentario creado exitosamente',
            comentario
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear el comentario',
            error: err.message
        });
    }
};

export const listComments = async (req, res) => {
    try {
        const { pid } = req.params;

        const comentarios = await Comentario.find({ publication: pid })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            comentarios
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al listar comentarios',
            error: err.message
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const authorId = req.user._id;

        const comentario = await Comentario.findById(id);

        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        if (comentario.author.toString() !== authorId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar este comentario'
            });
        }

        comentario.text = text;
        await comentario.save();

        return res.status(200).json({
            success: true,
            message: 'Comentario actualizado',
            comentario
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el comentario',
            error: err.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const authorId = req.user._id;

        const comentario = await Comentario.findById(id);

        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        if (comentario.author.toString() !== authorId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este comentario'
            });
        }

        await Comentario.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Comentario eliminado'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el comentario',
            error: err.message
        });
    }
};
