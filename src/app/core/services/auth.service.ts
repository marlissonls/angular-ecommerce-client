import { Injectable } from '@angular/core';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  AccessToken: string;
  RefreshToken: string;
}

const emptyUser: IUser = {
  _id: '',
  name: '',
  email: '',
  role: 'DEFAULT',
  AccessToken: '',
  RefreshToken: '',
};

const rolePermissions: Record<string, string[]> = {};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authKey = 'auth';

  get user(): IUser {
    try {
      const auth = localStorage.getItem(this.authKey);

      if (!auth) return { ...emptyUser };

      return {
        ...emptyUser,
        ...JSON.parse(auth),
      };
    } catch {
      return { ...emptyUser };
    }
  }

  hasPermission(resource: string): boolean {
    return (
      rolePermissions[this.user.role]?.includes(resource) ?? false
    );
  }

  isJwtExpired(): boolean {
    const token = this.user.AccessToken;

    if (!token) return true;

    try {
      const [, base64Url] = token.split('.');

      if (!base64Url) return true;

      const base64 = base64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const payload = atob(
        base64.padEnd(
          base64.length + ((4 - (base64.length % 4)) % 4),
          '=',
        ),
      );

      const { exp } = JSON.parse(payload);

      if (typeof exp !== 'number') return true;

      return Math.floor(Date.now() / 1000) >= exp;
    } catch {
      return true;
    }
  }

  saveSession(session: IUser): void {
    localStorage.setItem(this.authKey, JSON.stringify(session));
  }

  logout(): void {
    localStorage.removeItem(this.authKey);
  }
}
