// src/app/model/user.ts
export interface User {
  _id?: string; // El ID puede ser opcional para nuevas creaciones
  username: string;
  name?: string;
  lastName?: string;
  email: string;
  phone: string;
  password: string;
  status: boolean;
  role: string;
  deleteDate?: Date | null; // Incluye deleteDate como opcional
  idClient?: string;
}
