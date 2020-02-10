export class User {

  private id: number;
  private email: string;
  private password: string;
  public name: string;
  private admin: boolean;

  constructor(id: number, email: string, password: string, name: string, admin: boolean){
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.admin = admin;
  }

}
