import "dotenv/config";
import express from "express";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminDashboardRoutes from "./routes/admin.route.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/passport.js";
import helmet from "helmet";



const app = express();
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// routers

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin-dashboard", adminDashboardRoutes);

//Connect to DB

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

