// Importação de módulos necessários
import express, { Request, Response } from "express";
import { onRequest } from "firebase-functions/v2/https";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import dotenv from "dotenv";
import schoolDataRoutes from "./routes/schoolDataRoutes";

//Configuração do dotenv
dotenv.config();

// Criação de uma instância do Express
const app = express();
app.use(cors());

// Middleware para analisar solicitações JSON
app.use(bodyParser.json({ limit: "10mb" }));

// Configuração das rotas principais
app.get("/", (req: Request, res: Response) => {
  res.send("Rota principal");
});
app.use("/user", userRoutes);
app.use("/schoolData", schoolDataRoutes);

// Definição da porta do servidor
console.log("process.env.PRODUCTION", process.env.PRODUCTION);
if (process.env.PRODUCTION === "true") {
  exports.app = onRequest(app);
} else {
  const PORT: number = parseInt(process.env.PORT || "5000");
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
}
