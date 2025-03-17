const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

// Inicializar app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Permitir cualquier origen en desarrollo
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Conectar a la base de datos
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/loginapp";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado..."))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });

// Rutas
app.use("/api/auth", authRoutes);

// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({ msg: "API funcionando correctamente" });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
);
