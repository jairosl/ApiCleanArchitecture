import { IValidateNumberPhone } from '../IValidateNumberPhone';

export class PhoneNumberValidator implements IValidateNumberPhone {
  validate(phone: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    const validateFormat = regex.test(phone);

    return validateFormat;
  }
}
