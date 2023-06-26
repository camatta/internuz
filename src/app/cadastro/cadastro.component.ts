import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  nome: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  cadastrarUsuario() {
    const novoUsuario = {
      name: this.nome,
      email: this.email,
      password: this.password
    };

    this.http.post(environment.URL_API + '/api/auth/cadastro', novoUsuario)
      .subscribe(
        (res) => {
          console.log('Usuário cadastrado com sucesso!', res);
          const mensagem = 'Cadastro realizado com sucesso, aguarde a aprovação para realizar o login.';
          this.router.navigate(['/'], { queryParams: { mensagem } });
        },
        (error) => {
          console.error('Erro ao cadastrar usuário', error);
          // Exibir mensagem de erro ou fazer alguma ação adicional
        }
      );
  }
}