import { Schema, model } from 'mongoose';

const publicacionSchema = Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria']
    },
    text: {
        type: String,
        required: [true, 'El texto es obligatorio']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor es obligatorio']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

publicacionSchema.methods.toJSON = function () {
    const { _id, ...publicacion } = this.toObject();
    publicacion.pid = _id;
    return publicacion;
};

export default model('Publicacion', publicacionSchema);
