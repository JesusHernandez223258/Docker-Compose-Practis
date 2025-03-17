const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// Clave secreta para JWT desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || "misecreto123";

// Ruta para registro de usuarios
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Crear nuevo usuario
    user = new User({
      username,
      email,
      password,
    });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar usuario en la base de datos
    await user.save();

    // Crear y devolver token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
});

// Ruta para login de usuarios
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    // Crear y devolver token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;
