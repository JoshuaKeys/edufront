export enum KEYS {
  AUTH_HEADER = 'user-auth',
  TOKEN_DATA = 'token-data',
  USER_DATA = 'user-data'
}

export class SessionService {

  constructor() {
  }

  static get token(): string {
    return localStorage.getItem(KEYS.AUTH_HEADER);
  }

  static set token(value: string) {
    localStorage.setItem(KEYS.AUTH_HEADER, value);
  }

  static get tokenData(): any {
    return JSON.parse(localStorage.getItem(KEYS.TOKEN_DATA));
  }

  static set tokenData(value: any) {
    localStorage.setItem(KEYS.TOKEN_DATA, value);
  }

  static get userData(): any {
    return JSON.parse(localStorage.getItem(KEYS.USER_DATA));
  }

  static set userData(value: any) {
    localStorage.setItem(KEYS.USER_DATA, value);
  }

  static get userType(): string {
    return SessionService.tokenData ? SessionService.tokenData.roles[0] : null;
  }

  static deleteSession(): void {
    Object.keys(KEYS).forEach(key => localStorage.removeItem(KEYS[key]));
  }

  static decodeToken(encryptedToken: string): string {
    return atob(encryptedToken.split('.')[1]);
  }

  static get userId(): string {
    return localStorage.getItem('userId');
  }

  static set userId(id: string) {
    localStorage.setItem('userId', id);
  }

}
