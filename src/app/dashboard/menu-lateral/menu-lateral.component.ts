import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    // Limpe todos os dados de usuário armazenados
    this.authService.clearUserData();

    // Redirecione para a rota inicial
    this.router.navigate(['/']);
  }
}
