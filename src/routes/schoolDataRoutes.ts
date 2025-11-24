import express, { Request, Response } from "express";
import schoolDataController from "../controllers/schoolDataController";

const schoolDataRoutes = express.Router();

// ---------- SCHOOLDATA CRUD ----------

// Buscar todos os registros de SchoolData
schoolDataRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const response = await schoolDataController.list();
    return res.status(200).send(response);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message ?? "Não foi possível realizar essa ação");
  }
});

// Buscar um registro específico pelo ID
schoolDataRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await schoolDataController.listById(id);
    return res.status(200).send(response);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message ?? "Não foi possível realizar essa ação");
  }
});

// Criar um novo registro
schoolDataRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await schoolDataController.create(data);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message ?? "Não foi possível registrar");
  }
});

// Atualizar um registro existente pelo ID
schoolDataRoutes.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await schoolDataController.update(id, data);
    return res.status(200).send(response);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message ?? "Não foi possível realizar essa ação");
  }
});

// Deletar um registro pelo ID
schoolDataRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await schoolDataController.delete(id);
    return res.status(200).send(response);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message ?? "Não foi possível realizar essa ação");
  }
});

// Obter matérias do usuário por id
schoolDataRoutes.get("/materias/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const materias = await schoolDataController.findMaterias(id);
    return res.status(200).json({ materias });
  } catch (error: any) {
    res.status(500).send(error.message ?? "Erro ao buscar matérias");
  }
});

// ---------- DISCIPLINAS DENTRO DO SCHOOLDATA ----------

// Listar disciplinas de um SchoolData
schoolDataRoutes.get(
  "/:schoolId/disciplinas",
  async (req: Request, res: Response) => {
    try {
      const { schoolId } = req.params;
      const response = await schoolDataController.listDisciplinas(schoolId);
      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(error.message ?? "Erro ao listar disciplinas");
    }
  }
);

// Criar disciplina em um SchoolData
schoolDataRoutes.post(
  "/:schoolId/disciplinas",
  async (req: Request, res: Response) => {
    try {
      const { schoolId } = req.params;
      const data = req.body;
      const response = await schoolDataController.createDisciplina(
        schoolId,
        data
      );
      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(error.message ?? "Erro ao criar disciplina");
    }
  }
);

// Buscar disciplina específica
schoolDataRoutes.get(
  "/:schoolId/disciplinas/:disciplinaId",
  async (req: Request, res: Response) => {
    try {
      const { schoolId, disciplinaId } = req.params;
      const response = await schoolDataController.getDisciplinaById(
        schoolId,
        disciplinaId
      );
      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(error.message ?? "Erro ao buscar disciplina");
    }
  }
);

// Atualizar disciplina
schoolDataRoutes.put(
  "/:schoolId/disciplinas/:disciplinaId",
  async (req: Request, res: Response) => {
    try {
      const { schoolId, disciplinaId } = req.params;
      const data = req.body;
      const response = await schoolDataController.updateDisciplina(
        schoolId,
        disciplinaId,
        data
      );
      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(error.message ?? "Erro ao atualizar disciplina");
    }
  }
);

// Deletar disciplina
schoolDataRoutes.delete(
  "/:schoolId/disciplinas/:disciplinaId",
  async (req: Request, res: Response) => {
    try {
      const { schoolId, disciplinaId } = req.params;
      const response = await schoolDataController.deleteDisciplina(
        schoolId,
        disciplinaId
      );
      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(error.message ?? "Erro ao excluir disciplina");
    }
  }
);

export default schoolDataRoutes;
