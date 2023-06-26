import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(environment.URL_API + '/api/auth/login', loginData).pipe(
      map(response => {
        console.log('Resposta do login:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      })
    );
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserName(): string {
    // Recupera o nome do usuário
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : '';
  }

  clearUserData(): void {
    localStorage.removeItem('user');
    // Outros itens armazenados relacionados ao usuário, se houver
  }
}
