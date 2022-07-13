import { connection } from "../config/db.js";

export interface Employee {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  companyId: number;
}

export async function findByCPF(cpf: string) {
  const result = await connection.query<Employee, [string]>(
    "SELECT * FROM employees WHERE cpf=$1",
    [cpf]
  );

  return result.rows[0];
}
