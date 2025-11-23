import { Request, Response } from "express";
import SchoolDataModel, { SchoolData } from "../models/schoolDataModel";
import  User  from "../models/userModel";

const schoolDataController = {
    // Função para criar um novo registro
    create: async (data: SchoolData) => {
        try {
            await SchoolDataModel.createSchoolData(data);
            return 'Registro criado com sucesso';
        } catch (error) {
            throw new Error(error.message ?? 'Erro ao criar registro');
        }
    },

    // Função para listar todos os registros
    list: async () => {
        try {
            const results = await SchoolDataModel.listSchoolDatas();
            return results;
        } catch (error) {
            throw new Error(error.message ?? "Não foi possível listar registros");
        }
    },

    // Função para buscar um registro por ID
    listById: async (id: string) => {
        try {
            const result = await SchoolDataModel.getSchoolDataById(id);
            return result;
        } catch (error) {
            throw new Error(error.message ?? 'Erro ao listar registro por id');
        }
    },

    // Função para deletar um registro por id
    delete: async (id: string) => {
        try {
            await SchoolDataModel.deleteSchoolDataById(id);
            return "Registro excluído com sucesso";
        } catch (error) {
            throw new Error(error.message ?? 'Erro ao deletar registro por e-mail');
        }
    },

    // Função para atualizar um registro por id
    update: async (id: string, data: SchoolData) => {
        try {
            await SchoolDataModel.updateSchoolDataById(id, data);
            return "Registro editado com sucesso";
        } catch (error) {
            throw new Error(error.message ?? 'Erro ao atualizar registro por e-mail');
        }
    },

    //Função para buscar as matérias de um usuário pelo ID
    findMaterias: async (id: string) => {
    try {
        const materias = await User.getMateriasByUserId(id);

        if (materias === null) {
            throw new Error("Usuário ou turma não encontrada");
        }

        return materias;
    } catch (error: any) {
        throw new Error(error.message ?? "Erro ao buscar matérias");
    }
}

};

export default schoolDataController;