import { User } from '../../entities/User';

export interface IVerifyCpfRequest {
  cpf: string
}

export interface IVerifyCpfResponse {
  success: boolean;
  message?: string;
  user?: User;
}
