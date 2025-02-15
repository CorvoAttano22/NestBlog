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

export class Pagination {
  page: number;
  size: number;
  sort: string;
  direction: string;
  constructor(page: number, size: number, sort: string, direction: string) {
    this.page = page;
    this.size = size;
    this.sort = sort;
    this.direction = direction;
  }
}
