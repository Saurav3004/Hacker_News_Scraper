import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import storyRoutes from "./src/routes/storyRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import { scrapeHackerNews } from "./src/services/scraper.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);


app.use("/api/users", userRoutes);

app.post("/api/scrape", async (req, res) => {
  const data = await scrapeHackerNews();
  res.json(data);
});

scrapeHackerNews();


app.get("/health",(_req,res)  => {
  return res.status(200).json({
    message:"Server is healthy"
  })
})

app.listen(process.env.PORT, () => console.log("Server running"));