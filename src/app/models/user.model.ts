export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Cliente';
  phone: string;
  city: string;
}
