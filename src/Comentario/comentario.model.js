import { Schema, model } from 'mongoose';

const comentarioSchema = Schema({
    text: {
        type: String,
        required: [true, 'El texto del comentario es obligatorio']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor es obligatorio']
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: [true, 'La publicación es obligatoria']
    }
}, {
    timestamps: true,
    versionKey: false
});

comentarioSchema.methods.toJSON = function () {
    const { _id, ...comentario } = this.toObject();
    comentario.cid = _id;
    return comentario;
};

export default model('Comentario', comentarioSchema);
