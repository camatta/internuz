import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  nome: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

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
          // Redirecionar para a página de login ou fazer alguma ação adicional
        },
        (error) => {
          console.error('Erro ao cadastrar usuário', error);
          // Exibir mensagem de erro ou fazer alguma ação adicional
        }
      );
  }
}