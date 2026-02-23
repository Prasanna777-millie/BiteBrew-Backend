import express from "express";
import cors from "cors";
import { connection } from "./src/Database/db.js";
import authRouter from "./src/Routes/authRoutes.js"; 
import path from "path"; 
import "./src/Model/userModel.js";
import { sequelize } from "./src/Database/db.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH","PUT", "DELETE"],
  credentials: true,
}));

// parse JSON bodies
app.use(express.json());

app.use("/uploads/materials", express.static(path.join("./uploads/materials")));
app.use("/uploads/profiles", express.static(path.join("./uploads/profiles")));


// DB connection
// Routes
app.use("/api/auth", authRouter);

// Landing page
app.get("/", (req, res) => res.send("User API is running"));

connection()
  .then(async () => {
    await sequelize.sync({ alter: true });
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("DB connection failed:", err));