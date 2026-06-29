export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'Cliente';
  phone: string;
  city: string;
  birthDate: string;
  address: string;
}
