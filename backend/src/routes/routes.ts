import express from "express";
import userRouter from "./user/user.js";
import accountRouter from "./account/account.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;