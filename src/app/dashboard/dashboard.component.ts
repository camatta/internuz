import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service'; 
import { AvaliacoesService } from 'src/app/services/avaliacoes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  totalAtivos: number = 0;
  totalAvaliacoes: number = 0;
  totalDiamante: number = 0;


  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private avaliacoesService: AvaliacoesService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.buscarUsuariosAtivos();
    this.buscarTotalAvaliacoes();
  }

  isHomePage(): boolean {
    return this.router.url === '/dashboard';
  }

  buscarUsuariosAtivos(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.totalAtivos = users.filter(user => user.status === 'Ativo').length;
        this.totalDiamante = users.filter(user => user.nivel === 'diamante' && user.status === 'Ativo').length;
      },
      error => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }

  buscarTotalAvaliacoes(): void {
    this.avaliacoesService.getTotalAvaliacoes().subscribe(
      count => this.totalAvaliacoes = count,
      error => console.error('Erro ao buscar total de avaliações', error)
    );
  }
}
