export class User {
  id: number = 0;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
