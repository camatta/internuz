import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userInfo: any; // Variável para armazenar as informações do usuário

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;
      },
      (error: any) => {
        console.error('Erro ao obter informações do usuário', error);
      }
    );
  }
}
