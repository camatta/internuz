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
  showComercialLink = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    const accessLevel = user ? user.accessLevel : '';
    const team = user ? user.team : '';

    // Verificar o accessLevel e permissões
    this.showAvaliacoesLink = accessLevel === 'Líder de Equipe' || accessLevel === 'Administrador';
    this.showUsuariosLink = accessLevel === 'Líder de Equipe' || accessLevel === 'Administrador';
    this.showComercialLink = team === 'Comercial' || accessLevel === 'Administrador';
  }

  logout(): void {
    // Limpe todos os dados de usuário armazenados
    this.authService.clearUserData();

    // Redirecione para a rota inicial
    this.router.navigate(['/']);
  }
}
