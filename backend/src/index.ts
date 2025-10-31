import express from "express";
import userRouter from "./routes/user.js";

const app = express();
app.use(express.json());

app.use("/api/v1", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));