export class GenericResponse {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export enum Operation {
  register = 'register',
  login = 'login',
}
