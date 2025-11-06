import { httpClient } from "@/services/api";

type Transaction = {
  idUsuario: string;
  tipo: "ganhos" | "gastos";
  name: string;
  valor: number;
};

export type GetTransactionsResponse = Transaction & {
  id: number;
  categoria?: "ganhos" | "gastos";
};

class TransactionsService {
  async createTransaction(transaction: Transaction) {
    const payload = {
      idUsuario: transaction.idUsuario,
      tipo: transaction.name,
      valor: transaction.valor,
    };
    const response = await httpClient.post<GetTransactionsResponse>(
      `/${transaction.tipo}`,
      payload
    );
    return response;
  }

  async getTransactions(type: "ganhos" | "gastos", idUsuario: string) {
    const response = await httpClient.get<GetTransactionsResponse[]>(
      `/${type}?idUsuario=${idUsuario}`
    );
    return response;
  }

  async updateTransaction(
    id: number,
    tipo: "ganhos" | "gastos",
    idUsuario: string,
    name: string,
    valor: number
  ) {
    const payload = {
      idUsuario: idUsuario,
      tipo: name,
      valor: valor,
    };
    const response = await httpClient.put<GetTransactionsResponse>(
      `/${tipo}/${id}`,
      payload
    );
    return response;
  }

  async deleteTransaction(id: number, tipo: "ganhos" | "gastos") {
    const response = await httpClient.delete<void>(`/${tipo}/${id}`);
    return response;
  }
}

export const transactionsService = new TransactionsService();
