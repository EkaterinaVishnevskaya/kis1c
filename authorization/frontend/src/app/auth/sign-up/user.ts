
export class User {
  surename: string;
  name: string;
  patronymic: string;
  course: number;
  direction: string;
  email: string;
  password: string;


  constructor(surename: string, name: string, patronymic: string, course: number, direction: string,
  email: string, password: string) {
    this.surename = surename;
    this.name = name;
    this.patronymic = patronymic;
    this.course = course;
    this.direction = direction;
    this.email = email;
    this.password = password;
  }
}
