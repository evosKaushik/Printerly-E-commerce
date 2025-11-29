import "dotenv/config";
import express from "express";
import userRoutes from "./routes/user.route.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

// routers

app.use("/api/v1", userRoutes);

//Connect to DB

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
