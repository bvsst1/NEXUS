import { User } from '../models/user.model';

export const USERS_MOCK: User[] = [
  {
    id: 1,
    name: 'Admin Nexus',
    email: 'admin@nexus.cl',
    password: 'Admin@123',
    role: 'Admin',
    phone: '+56911112222',
    city: 'Santiago'
  },
  {
    id: 2,
    name: 'Cliente Demo',
    email: 'cliente@nexus.cl',
    password: 'Cliente@123',
    role: 'Cliente',
    phone: '+56933334444',
    city: 'Valparaiso'
  },
  {
    id: 3,
    name: 'Camila Torres',
    email: 'camila@nexus.cl',
    password: 'Mesa@123',
    role: 'Cliente',
    phone: '+56955556666',
    city: 'Concepcion'
  }
];
