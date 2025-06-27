import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-piramide',
  templateUrl: './piramide.component.html',
  styleUrls: ['./piramide.component.css']
})
export class PiramideComponent implements OnInit {
  totalDiamante: number = 0;
  totalOuro: number = 0;
  totalPrata: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      const ativos = users.filter(user => user.status === 'Ativo');

      this.totalDiamante = ativos.filter(user => user.nivel === 'diamante').length;
      this.totalOuro     = ativos.filter(user => user.nivel === 'ouro').length;
      this.totalPrata    = ativos.filter(user => user.nivel === 'prata').length;
    });
  }
}
