import { Injectable } from '@angular/core';
import { ModelMapper, propertyMap } from '@app/@core/mapper';
import { environment } from '@env/environment';

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
      this.setTokenData(credentials.token);
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
