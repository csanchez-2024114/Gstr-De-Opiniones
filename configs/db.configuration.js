import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.error('Mongo DB | Error de conexion')
            mongoose.disconnect();
        })
        mongoose.connection.on('connecting', () => {
            console.error('Mongo DB | Intentando conectar a MongoDB')
        })
        mongoose.connection.on('connected', () => {
            console.error('Mongo DB | Conectado a MongoDB')
        })
        mongoose.connection.on('open', () => {
            console.error('Mongo DB | Conectando a la base de datos')
        })
        mongoose.connection.on('reconnected', () => {
            console.error('Mongo DB | Reconectando a MongoDB')
        })
        mongoose.connection.on('disconnected', () => {
            console.error('Mongo DB | Desconectando de MongoDB')
        })
        await mongoose.connect(process.env.URI_MONGODB, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });
    } catch (err) {
        console.error(`Kinal Sports - Error al conectar la db: ${err.message}`)
        process.exit(1);
    }
}