/* eslint-disable no-useless-escape */
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { IValidateCpf } from '../IValidateCpf';

export class CpfValidate implements IValidateCpf {
  validate(cpf: string) {
    const regex = /([0-9]{2}[\.]?[0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[-][0-9]{2})|([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})/;

    const validateFormat = regex.test(cpf);
    const validateNumber = cpfValidator.isValid(cpf);

    return validateFormat && validateNumber;
  }
}
