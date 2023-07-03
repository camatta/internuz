import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})

export class MenuLateralComponent implements OnInit {
  showAvaliacoesLink = false;
  showUsuariosLink = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    const accessLevel = user ? user.accessLevel : '';

    // Verificar o accessLevel e definir as variáveis showAvaliacoesLink e showUsuariosLink
    this.showAvaliacoesLink = accessLevel === 'Líder de Equipe' || accessLevel === 'Administrador';
    this.showUsuariosLink = accessLevel === 'Líder de Equipe' || accessLevel === 'Administrador';
  }

  logout(): void {
    // Limpe todos os dados de usuário armazenados
    this.authService.clearUserData();

    // Redirecione para a rota inicial
    this.router.navigate(['/']);
  }
}
