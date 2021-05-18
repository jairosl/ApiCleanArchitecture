export interface ICreateUserRequestDTO {
  firstName: string;
  lastName: string;
  phone: string;
  cpf: string;
}

export interface ICreateUserResponseDTO {
  success: boolean;
  message: string;
}
