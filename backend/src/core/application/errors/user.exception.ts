export class InvalidEmailException extends Error {
  constructor(email: string) {
    super(`'${email}' es un correo inválido`);
    this.name = 'InvalidEmailException';
  }
}

export class InvalidPhoneException extends Error {
  constructor(phone: string) {
    super(`'${phone}' es un número de teléfono inválido`);
    this.name = 'InvalidPhoneException';
  }
}
