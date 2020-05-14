import * as moment from 'moment'
import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { JSO } from 'jso';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { SessionService } from '../session/session.service';
import { UserType } from '../../auth.constants';

export interface UserData {
  expiresAt: moment.Moment;
  issuedAt: moment.Moment;
  roles: string[];
  userId: string;
}

interface TokenDTO {
  token: string;
}

interface KeycloakTokenDTO {
  access_token: string;
  expires: number;
  expires_in: number;
  id_token: string;
  received: number;
  scopes: string[];
  session_state: string;
  state: string;
  token_type: string;
}
interface Domain {
  apiEndpoint: string;
  domainId: string;
  domainName: string;
}

@Injectable()
export class AuthService extends RestService {
  protected context = '';
  protected basePath = '';
  protected apiPath = '';
  protected version = '';

  private jso: JSO;

  loggedIn$ = new Subject<boolean>();

  private firstLogin = false;

  constructor(http: HttpClient, configService: ConfigService) {
    super(http, configService);
    this.loggedIn$.next(this.isLoggedIn)
  } get isStudent(): boolean {
    return this.userType === UserType.STUDENT;
  }

  get isAdmin(): boolean {
    return this.userType === UserType.ADMIN;
  }
  get tokenData(): UserData {
    const tokenData = SessionService.tokenData;

    if (!tokenData) { return null; }

    const { exp, iat, sub, roles } = tokenData;

    return {
      expiresAt: moment.unix(exp),
      issuedAt: moment.unix(iat),
      userId: sub,
      roles
    };
  }
  get isTeacher(): boolean {
    return this.userType === UserType.TEACHER;
  }

  get isLoggedIn(): boolean {
    return !!SessionService.token && !!SessionService.tokenData;
  }
  get userType() {
    return SessionService.userType;
  }
  get sessionToken() {
    return SessionService.userData;
  }
  get hasTokenExpired(): boolean {
    const token = this.tokenData;

    if (!token) { return true; }

    return moment().isSameOrAfter(token.expiresAt);
  }
  initialize() {
    this.jso = new JSO({
      client_id: this.configService.get('KEYCLOAK.CLIENT_ID'),
      redirect_uri: window.location.origin,
      authorization: this.configService.get('KEYCLOAK.BASE_URL') + 'auth',
      scopes: { request: ['openid', 'profile'] }
    });

    this.jso.callback();
  }

  deleteSessionToken() {
    SessionService.deleteSession();
  }
  login() {
    console.log('tokennnnnnnn')
    let headers: HttpHeaders;
    return this.jso.getToken()
      .then((token: KeycloakTokenDTO) => {
        console.log(token);
        headers = new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`);
        return this.http.get('auth/api/v1/domain', { headers }).toPromise();
      })
      .then((domains: Domain[]) => {
        console.log(domains);
        return this.http.get(`auth/api/v1/domain/${domains[0].domainId}/token`, { headers }).toPromise()
      })
      .then((res: TokenDTO) => {
        this.setupToken(res.token);
        this.setupFirstLogin();
        SessionService.userId = this.tokenData.userId;
      });
  }
  private setupToken(token: string) {
    console.log(token);
    localStorage.setItem("token", token);

    SessionService.token = token;
    SessionService.tokenData = SessionService.decodeToken(token);

    this.setupTokenRefresh();

    this.loggedIn$.next(true);
  }
  private setupFirstLogin() {
    this.firstLogin = SessionService.userId == null || SessionService.userId !== this.tokenData.userId;
  }
  setupTokenRefresh() {
    const tokenData = this.tokenData;

    if (!this.isLoggedIn || !tokenData) { return; }

    const tillExpiry = tokenData.expiresAt.diff(moment());

    if (tillExpiry < 0) { return; }

    const timeout = Math.floor(tillExpiry * .9);

    setTimeout(() => {
      this.login();
    }, timeout);
  }
}
