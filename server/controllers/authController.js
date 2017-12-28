const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { createNewUser, findUserByUsername } = require('../models/services/user');
const { INVALID_INPUT_STATUS } = require('../constants/httpStatus');
const { transformOne } = require('../transformers/userTransformer');

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await findUserByUsername(username);

        if (!user) {
            res.status(401).json({ message: 'username does not exist' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            res.status(401).json({ message: 'authentication failed' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { issuer: process.env.JWT_ISSUER }
        );

        res.json({
            success: true,
            user: transformOne({ ...user, token }),
        });
    } catch ({ message }) {
        res.status(500).json({ message });
    }
};

const register = async (req, res) => {
    const {
        email,
        password,
        passwordConfirmation,
        username,
        firstName,
        lastName
    } = req.body;

    if (!password || password.length < 8) {
        return res.status(INVALID_INPUT_STATUS).json({ message: 'password must be at least 8 characters long' });
    }

    if (password !== passwordConfirmation) {
        return res.status(INVALID_INPUT_STATUS).json({ message: 'passwords must match' });
    }

    if (!emailValidator.validate(email)) {
        return res.status(INVALID_INPUT_STATUS).json({ message: 'email is required and must be valid email' });
    }

    if (!username || username.length < 1) {
        return res.status(INVALID_INPUT_STATUS).json({ message: 'username is required' });
    }

    const userExists = await findUserByUsername(username);

    if (userExists) {
        return res.status(INVALID_INPUT_STATUS).json({ message: 'username is already in use' });
    }

    const encryptedPassword = await bcrypt.hash(password, 8);
    const user = await createNewUser({
        email,
        password: encryptedPassword,
        username,
        firstName,
        lastName
    });

    return res.json(user);
};

module.exports = {
    login,
    register,
};
