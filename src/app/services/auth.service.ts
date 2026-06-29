import { Injectable, computed, signal } from '@angular/core';
import { USERS_MOCK } from '../data/users.mock';
import { User } from '../models/user.model';

interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  birthDate: string;
  address?: string;
}

interface ProfilePayload {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly usersKey = 'nexus-users';
  private readonly sessionKey = 'nexus-session-user';

  private readonly usersState = signal<User[]>(this.loadUsers());
  private readonly currentUserState = signal<User | null>(this.loadSessionUser());

  readonly users = computed(() => this.usersState());
  readonly currentUser = computed(() => this.currentUserState());
  readonly isLoggedIn = computed(() => this.currentUserState() !== null);
  readonly isAdmin = computed(() => this.normalizeRole(this.currentUserState()?.role) === 'Admin');
  readonly currentRole = computed(() => (this.currentUserState() ? this.normalizeRole(this.currentUserState()?.role) : null));

  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.usersState().find(
      (item) => item.email.toLowerCase() === normalizedEmail && item.password === password
    );

    if (!user) {
      return false;
    }

    this.currentUserState.set(user);
    this.saveSessionUser(user);
    return true;
  }

  getDashboardRoute(): string {
    return this.isAdmin() ? '/admin' : '/profile';
  }

  logout(): void {
    this.currentUserState.set(null);
    this.removeStorageItem(this.sessionKey);
  }

  registerUser(payload: RegisterPayload): { success: boolean; message: string } {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const normalizedUsername = payload.username.trim().toLowerCase();

    const duplicateUser = this.usersState().find(
      (item) => item.email.toLowerCase() === normalizedEmail || item.username.toLowerCase() === normalizedUsername
    );

    if (duplicateUser) {
      return {
        success: false,
        message: 'Ya existe una cuenta registrada con ese correo o nombre de usuario.'
      };
    }

    const newUser: User = {
      id: Date.now(),
      name: payload.name.trim(),
      username: payload.username.trim(),
      email: normalizedEmail,
      password: payload.password,
      role: 'Cliente',
      phone: '',
      city: '',
      birthDate: payload.birthDate,
      address: payload.address?.trim() ?? ''
    };

    const updatedUsers = [...this.usersState(), newUser];
    this.usersState.set(updatedUsers);
    this.saveUsers(updatedUsers);
    this.currentUserState.set(newUser);
    this.saveSessionUser(newUser);

    return {
      success: true,
      message: 'Tu cuenta fue creada y la sesion quedo iniciada.'
    };
  }

  updateProfile(payload: ProfilePayload): void {
    const activeUser = this.currentUserState();
    if (!activeUser) {
      return;
    }

    const updatedUser: User = {
      ...activeUser,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      city: payload.city.trim(),
      address: payload.address.trim()
    };

    const updatedUsers = this.usersState().map((item) => (item.id === updatedUser.id ? updatedUser : item));
    this.usersState.set(updatedUsers);
    this.currentUserState.set(updatedUser);
    this.saveUsers(updatedUsers);
    this.saveSessionUser(updatedUser);
  }

  private loadUsers(): User[] {
    const storedUsers = this.readStorageItem(this.usersKey);

    if (!storedUsers) {
      const defaultUsers = this.normalizeUsers(USERS_MOCK);
      this.saveUsers(defaultUsers);
      return defaultUsers;
    }

    try {
      const parsedUsers = JSON.parse(storedUsers) as Partial<User>[];
      const normalizedUsers = this.mergeWithDefaultUsers(this.normalizeUsers(parsedUsers));
      this.saveUsers(normalizedUsers);
      return normalizedUsers;
    } catch {
      const defaultUsers = this.normalizeUsers(USERS_MOCK);
      this.saveUsers(defaultUsers);
      return defaultUsers;
    }
  }

  private loadSessionUser(): User | null {
    const storedSession = this.readStorageItem(this.sessionKey);
    if (!storedSession) {
      return null;
    }

    try {
      return this.normalizeUser(JSON.parse(storedSession) as Partial<User>);
    } catch {
      this.removeStorageItem(this.sessionKey);
      return null;
    }
  }

  private normalizeUsers(users: Partial<User>[]): User[] {
    return users.map((user, index) => this.normalizeUser(user, index));
  }

  private mergeWithDefaultUsers(users: User[]): User[] {
    const usersByEmail = new Map(users.map((user) => [user.email.toLowerCase(), user]));

    for (const defaultUser of this.normalizeUsers(USERS_MOCK)) {
      const emailKey = defaultUser.email.toLowerCase();
      const existingUser = usersByEmail.get(emailKey);

      if (!existingUser) {
        usersByEmail.set(emailKey, defaultUser);
        continue;
      }

      if (emailKey === 'admin@nexus.cl') {
        usersByEmail.set(emailKey, {
          ...existingUser,
          username: existingUser.username || defaultUser.username,
          role: 'Admin'
        });
      }
    }

    return Array.from(usersByEmail.values());
  }

  private normalizeUser(user: Partial<User>, index = 0): User {
    return {
      id: user.id ?? Date.now() + index,
      name: user.name?.trim() || `Usuario ${index + 1}`,
      username: user.username?.trim() || `usuario${index + 1}`,
      email: user.email?.trim().toLowerCase() || `usuario${index + 1}@nexus.cl`,
      password: user.password || 'Cliente@123',
      role: this.normalizeRole(user.role),
      phone: user.phone?.trim() || '',
      city: user.city?.trim() || '',
      birthDate: user.birthDate || '2000-01-01',
      address: user.address?.trim() || ''
    };
  }

  private normalizeRole(role: User['role'] | string | undefined): User['role'] {
    return String(role || '').toLowerCase() === 'admin' ? 'Admin' : 'Cliente';
  }

  private saveUsers(users: User[]): void {
    this.writeStorageItem(this.usersKey, JSON.stringify(users));
  }

  private saveSessionUser(user: User): void {
    this.writeStorageItem(this.sessionKey, JSON.stringify(user));
  }

  private readStorageItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private writeStorageItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // noop when storage is unavailable
    }
  }

  private removeStorageItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // noop when storage is unavailable
    }
  }
}
