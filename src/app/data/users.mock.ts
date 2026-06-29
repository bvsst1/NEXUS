import { User } from '../models/user.model';

export const USERS_MOCK: User[] = [
  {
    id: 1,
    name: 'Admin Nexus',
    username: 'admin',
    email: 'admin@nexus.cl',
    password: 'Admin@123',
    role: 'Admin',
    phone: '+56911112222',
    city: 'Santiago',
    birthDate: '1990-05-10',
    address: 'Avenida Central 100'
  },
  {
    id: 2,
    name: 'Cliente Demo',
    username: 'cliente',
    email: 'cliente@nexus.cl',
    password: 'Cliente@123',
    role: 'Cliente',
    phone: '+56933334444',
    city: 'Valparaiso',
    birthDate: '1998-08-21',
    address: 'Pasaje Puerto 220'
  },
  {
    id: 3,
    name: 'Camila Torres',
    username: 'camila',
    email: 'camila@nexus.cl',
    password: 'Mesa@123',
    role: 'Cliente',
    phone: '+56955556666',
    city: 'Concepcion',
    birthDate: '1996-11-03',
    address: 'Calle Sur 455'
  }
];
