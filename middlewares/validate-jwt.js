import jwt from 'jsonwebtoken';
import User from '../src/Usuario/user.model.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            message: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                message: 'Token no válido - usuario no existe en DB'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                message: 'Token no válido - usuario con estado: false'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Token no válido'
        });
    }
};
