import { Component } from '@angular/core';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  userName: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }
}
