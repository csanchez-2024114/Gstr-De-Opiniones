import Publicacion from './publicacion.model.js';

export const createPublication = async (req, res) => {
    try {
        const data = req.body;
        data.author = req.user._id;

        const publicacion = await Publicacion.create(data);

        return res.status(201).json({
            message: "Publicación creada exitosamente",
            publicacion
        });
    } catch (err) {
        return res.status(500).json({ message: "Error al crear la publicación", error: err.message });
    }
};

export const listPublications = async (req, res) => {
    try {
        const publications = await Publicacion.find()
            .populate('author', 'username name -_id');

        return res.status(200).json({
            message: "Publicaciones obtenidas exitosamente",
            total: publications.length,
            publications
        });
    } catch (err) {
        return res.status(500).json({ message: "Error al listar las publicaciones", error: err.message });
    }
};

export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const publicacion = await Publicacion.findById(id)
            .populate('author', 'username name -_id');

        if (!publicacion) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }

        return res.status(200).json({
            message: "Publicación obtenida exitosamente",
            publicacion
        });
    } catch (err) {
        return res.status(500).json({ message: "Error al obtener la publicación", error: err.message });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, author, date, ...data } = req.body;

        const publicacion = await Publicacion.findById(id);

        if (!publicacion) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }

        if (publicacion.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "No tienes permiso para editar esta publicación" });
        }

        const updatedPublication = await Publicacion.findByIdAndUpdate(id, data, { new: true })
            .populate('author', 'username name -_id');

        return res.status(200).json({
            message: "Publicación actualizada exitosamente",
            publicacion: updatedPublication
        });
    } catch (err) {
        return res.status(500).json({ message: "Error al actualizar la publicación", error: err.message });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await Publicacion.findById(id);

        if (!publicacion) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }

        if (publicacion.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "No tienes permiso para eliminar esta publicación" });
        }

        await Publicacion.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Publicación eliminada exitosamente"
        });
    } catch (err) {
        return res.status(500).json({ message: "Error al eliminar la publicación", error: err.message });
    }
};
