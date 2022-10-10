import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { paymentRoutes } from "./routes/paymentRoutes";
import { buyerRoutes } from "./routes/buyerRoutes";
import { cardRoutes } from "./routes/cardRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`\x1b[32m Servidor rodando na porta ${process.env.PORT || 3003}`);
});

app.use("/payment", paymentRoutes);
app.use("/buyer", buyerRoutes);
app.use("/card", cardRoutes);
