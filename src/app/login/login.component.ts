import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };
  
    this.http.post<any>(environment.URL_API + '/api/auth/login', loginData).subscribe(
      response => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log('Erro de autenticação')
      }
    );
  }
}
