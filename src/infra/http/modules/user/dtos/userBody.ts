export class UserBody {
  email: string;
  name: string;
  password: string;
  role?: 'admin' | 'user';
}