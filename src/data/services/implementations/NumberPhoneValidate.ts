import { IValidateNumberPhone } from '../IValidateNumberPhone';

export class PhoneNumberValidator implements IValidateNumberPhone {
  validate(phone: string) {
    const regex = /(0?[1-9]{2})*\D*(9?)\D?(\d{4})+\D?(\d{4})\b/;
    const validateFormat = regex.test(phone);

    return validateFormat;
  }
}
