import SchoolDataModel, {
  SchoolData,
  Disciplina,
} from "../models/schoolDataModel";
import UserModel from "../models/userModel";

const schoolDataController = {
  // ---------- SCHOOLDATA CRUD ----------

  create: async (data: SchoolData) => {
    try {
      await SchoolDataModel.createSchoolData(data);
      return "Registro criado com sucesso";
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao criar registro");
    }
  },

  list: async () => {
    try {
      const results = await SchoolDataModel.listSchoolDatas();
      return results;
    } catch (error: any) {
      throw new Error(error.message ?? "Não foi possível listar registros");
    }
  },

  listById: async (id: string) => {
    try {
      const result = await SchoolDataModel.getSchoolDataById(id);
      return result;
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao listar registro por id");
    }
  },

  delete: async (id: string) => {
    try {
      await SchoolDataModel.deleteSchoolDataById(id);
      return "Registro excluído com sucesso";
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao deletar registro por id");
    }
  },

  update: async (id: string, data: SchoolData) => {
    try {
      await SchoolDataModel.updateSchoolDataById(id, data);
      return "Registro editado com sucesso";
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao atualizar registro por id");
    }
  },

  // ---------- MATERIAS DO USUÁRIO (JÁ EXISTENTE) ----------

  findMaterias: async (id: string) => {
    try {
      const materias = await UserModel.getMateriasByUserId(id);

      if (materias === null) {
        throw new Error("Usuário ou turma não encontrada");
      }

      return materias;
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao buscar matérias");
    }
  },

  // ---------- DISCIPLINAS DENTRO DE UM SCHOOLDATA ----------

  listDisciplinas: async (schoolId: string) => {
    try {
      const disciplinas = await SchoolDataModel.listDisciplinas(schoolId);
      return disciplinas;
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao listar disciplinas");
    }
  },

  createDisciplina: async (
    schoolId: string,
    data: Omit<Disciplina, "id" | "createdAt">
  ) => {
    try {
      if (!data.professorId) {
        throw new Error("professorId é obrigatório");
      }

      const disciplina = await SchoolDataModel.createDisciplina(schoolId, data);
      return disciplina;
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao criar disciplina");
    }
  },

  getDisciplinaById: async (schoolId: string, disciplinaId: string) => {
    try {
      const disciplina = await SchoolDataModel.getDisciplinaById(
        schoolId,
        disciplinaId
      );
      if (!disciplina) {
        throw new Error("Disciplina não encontrada");
      }
      return disciplina;
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao buscar disciplina");
    }
  },

  updateDisciplina: async (
    schoolId: string,
    disciplinaId: string,
    data: Partial<Disciplina>
  ) => {
    try {
      await SchoolDataModel.updateDisciplina(schoolId, disciplinaId, data);
      return "Disciplina atualizada com sucesso";
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao atualizar disciplina");
    }
  },

  deleteDisciplina: async (schoolId: string, disciplinaId: string) => {
    try {
      await SchoolDataModel.deleteDisciplina(schoolId, disciplinaId);
      return "Disciplina excluída com sucesso";
    } catch (error: any) {
      throw new Error(error.message ?? "Erro ao excluir disciplina");
    }
  },
};

export default schoolDataController;
