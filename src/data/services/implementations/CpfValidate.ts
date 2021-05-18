/* eslint-disable no-useless-escape */
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { IValidateCpf } from '../IValidateCpf';

export class CpfValidate implements IValidateCpf {
  validate(cpf: string) {
    const validateNumber = cpfValidator.isValid(cpf);

    return validateNumber;
  }
}
