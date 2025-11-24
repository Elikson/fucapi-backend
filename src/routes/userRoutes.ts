import express, { Request, Response } from "express";
import userController from "../controllers/userController";

const userRoutes = express.Router();

// Rota para obter matérias do usuário por ID (userId do Firebase)
// Rota para obter matérias do usuário por ID (userId do Firebase)
userRoutes.get("/materias/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const materias = await userController.getMaterias(userId);
    return res.status(200).json(materias);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message ?? "Não foi possível buscar matérias do usuário");
  }
});

// Rota para obter todos os usuários
userRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const response = await userController.listUsers();
    return res.status(200).send(response);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message ?? "Não foi possível realizar essa ação");
  }
});

// Rota para obter um usuário por E-mail
userRoutes.get("/:email", async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const response = await userController.listUserByEmail(email);
    return res.status(200).send(response);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message ?? "Não foi possível realizar essa ação");
  }
});

// Rota para criar um novo usuário
userRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const response = await userController.createUser(user);
    res.status(200).send(response);
  } catch (error: any) {
    console.error("ERRO CREATE USER:", error);
    res.status(500).send(error.message ?? "Não foi possível criar o usuário");
  }
});

// Rota para atualizar um usuário existente
userRoutes.put("/:email", async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const userEdit = req.body;
    const response = await userController.updateUser(email, userEdit);
    return res.status(200).send(response);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message ?? "Não foi possível realizar essa ação");
  }
});

// Rota para excluir um usuário
userRoutes.delete("/:email", async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const response = await userController.deleteUser(email);
    return res.status(200).send(response);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message ?? "Não foi possível realizar essa ação");
  }
});

// Rota de login
userRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    console.log("body", req.body);
    const { email, password } = req.body;
    const response = await userController.login(email, password);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message ?? "Dados de login incorretos.");
  }
});

// Rota de recuperação de senha
userRoutes.post("/recover-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const response = await userController.recoverPassword(email);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message ?? "Dados de usuário incorretos.");
  }
});

export default userRoutes;
