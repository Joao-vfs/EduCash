import { API_BASE_URL } from "@/constants/routes/routes";
import { httpClient } from "@/services/api";

type UserAPI = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

type RegisterResponse = {
  id: number;
  idGrupo: number | null;
  nome: string;
  email: string;
  senha: string;
};

class AuthService {
  async login(email: string, password: string) {
    const users = await httpClient.get<UserAPI[]>("/usuarios");

    const user = users.find(
      (u: UserAPI) => u.email === email && u.senha === password
    );

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    return {
      user: {
        id: user.id.toString(),
        name: user.nome,
        email: user.email,
      },
    };
  }

  async register(name: string, email: string, password: string) {
    const payload = {
      nome: name,
      email,
      senha: password,
      idGrupo: null,
    };

    const response = await httpClient.post<RegisterResponse>(
      "/usuarios",
      payload
    );

    return {
      user: {
        id: response.id.toString(),
        name: response.nome,
        email: response.email,
      },
    };
  }
}

export const authService = new AuthService();
