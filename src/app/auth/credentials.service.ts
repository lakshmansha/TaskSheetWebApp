import { Injectable } from '@angular/core';
import { ModelMapper, propertyMap } from '@app/@core/mapper';
import { environment } from '@env/environment';
import jwt_decode, { JwtPayload } from 'jwt-decode';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

export class TokenData {
  @propertyMap('Authorization')
  token: string;
  @propertyMap('Max-Age')
  expiresIn: string;

  constructor() {
    this.token = null;
    this.expiresIn = null;
  }
}

const credentialsKey = environment.credentialsKey;

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: Credentials | null = null;
  private _tokenData: TokenData | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      this._tokenData = this.setTokenData(this._credentials.token);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  isTokenValid(): boolean {
    const rtnval = true;
    const expiresIn = this._tokenData.expiresIn;
    if (this.isEmpty(expiresIn) && this.tokenExpired(expiresIn)) {
      return false;
    }

    return rtnval;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode<JwtPayload>(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this._tokenData.token;
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  private isEmpty = (value: string | number | object): boolean => {
    if (value === null) {
      return true;
    } else if (typeof value !== 'number' && value === '') {
      return true;
    } else if (value === 'undefined' || value === undefined) {
      return true;
    } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
      return true;
    } else {
      return false;
    }
  };

  private tokenExpired = (expiresIn: string) => {
    const expiry = parseInt(expiresIn, 0);
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  };
  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  get tokenData(): TokenData | null {
    return this._tokenData;
  }

  setTokenData(token: string) {
    if (!token) return {} as TokenData;
    let tokenData: TokenData = {} as any;
    const rawdata = token.split(';');

    rawdata.forEach((value) => {
      if (value.includes('=')) {
        const split = value.split('=');
        tokenData[split[0].trim()] = split[1];
      }
    });

    const rtnVal = new ModelMapper(TokenData).map(tokenData);
    return rtnVal;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
      this._tokenData = this.setTokenData(credentials.token);
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
