import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('/api/auth', { email, password })
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  register({ email, password }): Observable<boolean> {
    return this.http.post<{token: string}>('/api/register', { email, password })
    .pipe(
      map(result => {
        if(!result.token) {
          return false;
        }
        localStorage.setItem('access_token', result.token);
        return true;
      })
    );
  }

  validateEmail(email: string): Observable<any> {
    return this.http.post('/api/validate', { email });
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
