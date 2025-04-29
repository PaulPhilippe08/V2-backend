import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

const app = express();
const port = 4000;

// Autoriser uniquement les origines sûres
const allowedOrigins = [
  "http://localhost:5173",
  "https://v2-frontend-2.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Autoriser les requêtes sans origine (comme Postman)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Autorise l'envoi de cookies/headers d'autorisation
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("public/images")); // Pour les images statiques

// Connexion DB
connectDB();

// Routes API
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Route test
app.get("/", (req, res) => {
  res.send("API Working");
});

// Lancement serveur
app.listen(port, () => {
  console.log(`✅ Server Started on http://localhost:${port}`);
});
