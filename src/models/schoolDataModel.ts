import admin from "../config/firebaseConfig";

// Interface que representa um horário de aula
export interface Time {
  dateTime: string;
  dayOfWeek: string;
}

// Interface da estrutura de uma turma (classe)
export interface ClassData {
  name?: string;
  times: Time[];
  class: string;
  id?: string;
}

// Interface que representa um aluno
interface Student {
  name: string;
  birthdate: string;
  registerId: string;
  document: string;
  status: "active" | "inactive";
}

// Interface dos dados de um curso
export interface CourseData {
  name: string;
  classList?: ClassData[];
  students: Student[];
  createdAt: string;
  id?: string;
}

// NOVO: interface de disciplina
export interface Disciplina {
  id: string;
  nome: string;
  icone?: string;
  sala?: string;
  classroom?: string;
  aviso?: string;
  professorId: string;
  times: Time[]; // <- horário/dias da matéria
  createdAt: string;
}

// Interface que representa os dados principais de uma escola
export interface SchoolData {
  name?: string;
  courseList?: CourseData[];
  createdAt: string;
  id: string;
  disciplinas?: {
    [id: string]: Disciplina;
  };
}

const schoolDataRef = admin.database().ref("schoolData");

export default class SchoolDataModel {
  // ---------- SCHOOLDATA CRUD ----------

  static async createSchoolData(schoolDataData: SchoolData): Promise<void> {
    const newRef = schoolDataRef.push();
    schoolDataData.createdAt = new Date().toISOString();
    schoolDataData.id = newRef.key as string;
    return newRef.set(schoolDataData);
  }

  static async listSchoolDatas(): Promise<SchoolData[]> {
    const snapshot = await schoolDataRef.once("value");
    const schoolDatas: SchoolData[] = [];

    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      schoolDatas.push(data);
    });

    return schoolDatas;
  }

  static async getSchoolDataById(id: string): Promise<SchoolData | null> {
    const snapshot = await schoolDataRef
      .orderByChild("id")
      .equalTo(id)
      .once("value");

    if (snapshot.exists()) {
      const data = snapshot.val();
      const firebaseKey = Object.keys(data)[0];
      return { ...data[firebaseKey], id: firebaseKey };
    }

    return null;
  }

  static async updateSchoolDataById(
    id: string,
    updatedData: Partial<SchoolData>
  ): Promise<void> {
    const data = await SchoolDataModel.getSchoolDataById(id);

    if (!data) {
      throw new Error("Dado não encontrado");
    }

    await schoolDataRef.child(data.id).update(updatedData);
  }

  static async deleteSchoolDataById(id: string): Promise<void> {
    const data = await SchoolDataModel.getSchoolDataById(id);

    if (!data) {
      throw new Error("Dado não encontrado");
    }

    await schoolDataRef.child(data.id).remove();
  }

  // ---------- DISCIPLINAS DENTRO DE SCHOOLDATA ----------

  private static disciplinasRef(schoolId: string) {
    return schoolDataRef.child(schoolId).child("disciplinas");
  }

  static async listDisciplinas(schoolId: string): Promise<Disciplina[]> {
    const snap = await SchoolDataModel.disciplinasRef(schoolId).once("value");
    const result: Disciplina[] = [];

    if (!snap.exists()) return result;

    snap.forEach((child) => {
      result.push(child.val());
    });

    return result;
  }

  static async createDisciplina(
    schoolId: string,
    data: Omit<Disciplina, "id" | "createdAt">
  ): Promise<Disciplina> {
    const ref = SchoolDataModel.disciplinasRef(schoolId);
    const id = ref.push().key as string;

    const disciplina: Disciplina = {
      id,
      nome: data.nome,
      icone: data.icone ?? "",
      sala: data.sala ?? "",
      classroom: data.classroom ?? "",
      aviso: data.aviso ?? "",
      professorId: data.professorId,
      times: data.times ?? [], // usa os horários vindos do front
      createdAt: new Date().toISOString(),
    };

    await ref.child(id).set(disciplina);
    return disciplina;
  }

  static async getDisciplinaById(
    schoolId: string,
    disciplinaId: string
  ): Promise<Disciplina | null> {
    const snap = await SchoolDataModel.disciplinasRef(schoolId)
      .child(disciplinaId)
      .once("value");

    if (!snap.exists()) return null;
    return snap.val();
  }

  static async updateDisciplina(
    schoolId: string,
    disciplinaId: string,
    data: Partial<Disciplina>
  ): Promise<void> {
    const ref = SchoolDataModel.disciplinasRef(schoolId).child(disciplinaId);
    const snap = await ref.once("value");
    if (!snap.exists()) {
      throw new Error("Disciplina não encontrada");
    }

    await ref.update(data);
  }

  static async deleteDisciplina(
    schoolId: string,
    disciplinaId: string
  ): Promise<void> {
    const ref = SchoolDataModel.disciplinasRef(schoolId).child(disciplinaId);
    const snap = await ref.once("value");
    if (!snap.exists()) {
      throw new Error("Disciplina não encontrada");
    }

    await ref.remove();
  }
}
