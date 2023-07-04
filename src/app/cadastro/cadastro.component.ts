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
  team: string = '';
  showPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  cadastrarUsuario() {
    const novoUsuario = {
      name: this.nome,
      email: this.email,
      password: this.password,
      team: this.team,
      accessLevel: 'Funcionário', // Definindo o valor padrão "Funcionário" para accessLevel
      setor: 'Indefinido' // Setor padrão
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