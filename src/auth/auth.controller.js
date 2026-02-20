import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt;
import User from '../Usuario/user.model.js';
import { generateJWT } from './auth.service.js';

export const register = async (req, res) => {
    try {
        const data = req.body;

        data.password = await hash(data.password, 10);

        const user = await User.create(data);
        return res.status(201).json({
            message: "Usuario creado exitosamente",
            username: user.username
        });
    } catch (err) {
        return res.status(500).json({ message: "Error al registrar", error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { loginIdentifier, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: loginIdentifier }, { username: loginIdentifier }]
        });

        if (user && await compare(password, user.password)) {
            const token = await generateJWT(user._id);
            return res.status(200).json({
                message: "Login exitoso",
                token
            });
        }

        return res.status(400).json({ message: "Credenciales inválidas" });
    } catch (err) {
        return res.status(500).json({ message: "Error en el servidor", error: err.message });
    }
};