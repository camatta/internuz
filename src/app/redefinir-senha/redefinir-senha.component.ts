import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as alertifyjs from 'alertifyjs';


@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})

export class RedefinirSenhaComponent implements OnInit {
  redefinirSenhaForm!: FormGroup;
  novaSenhaForm!: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obter o token da URL
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {
      // Token presente na URL, exibir formulário de nova senha
      this.novaSenhaForm = this.fb.group({
        novaSenha: ['', Validators.required]
      });
    } else {
      // Token não presente na URL, exibir formulário de solicitação de redefinição de senha
      this.redefinirSenhaForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }
  }

  solicitarRedefinicao(): void {
    if (this.redefinirSenhaForm.valid) {
      const email = this.redefinirSenhaForm.value.email;

      this.authService.solicitarRedefinicaoSenha(email).subscribe({
        next: (response) => {
          console.log(response);
          alertifyjs.success('E-mail enviado com sucesso.'); 
        },
        error: (error) => {
          console.error(error);
          alertifyjs.error(error.error.message); 
        }
      });
    }
  }


  redefinirSenha(): void {
    if (this.novaSenhaForm.valid && this.token) {
      const novaSenha = this.novaSenhaForm.value.novaSenha;
    }
  }
}
