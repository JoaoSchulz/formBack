interface UserSchema {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  id?: number; // agora number
  role: 'admin' | 'user'; // Add role property
}

export class User {
  id?: number; // agora number e opcional
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  role: 'admin' | 'user'; // Add role property

  constructor(props: UserSchema) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.role = props.role;
  }
}