import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css']
})

export class AvaliacoesComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  items: any[] = [
    { competencia: 'Atualização', requisito: 'Obrigatório' },
    { competencia: 'Comunicação verbal', requisito: 'Desejado' },
    { competencia: 'Disponibilidade', requisito: 'Diferencial' },
    { competencia: 'Gestão de tarefas', requisito: 'Diferencial' },
    { competencia: 'Ser prestativo', requisito: 'Diferencial' },
    { competencia: 'Flexibilidade', requisito: 'Diferencial' },
    { competencia: 'Saber ouvir', requisito: 'Desejado' },
    { competencia: 'Comprometimento', requisito: 'Obrigatório' },
    { competencia: 'Trabalho em equipe', requisito: 'Diferencial' },
    { competencia: 'Persuasão', requisito: 'Diferencial' },
    { competencia: 'Discrição', requisito: 'Diferencial' },
    { competencia: 'Criatividade', requisito: 'Diferencial' },
    { competencia: 'Liderança', requisito: 'Diferencial' },
    { competencia: 'Autonomia', requisito: 'Diferencial' },
    { competencia: 'Controle emocional', requisito: 'Diferencial' },
    { competencia: 'Visão holística', requisito: 'Diferencial' },
    { competencia: 'Postura', requisito: 'Diferencial' },
    { competencia: 'Relação interpessoal', requisito: 'Diferencial' },
    { competencia: 'Análise de métricas', requisito: 'Diferencial' },
    { competencia: 'Análise de dados', requisito: 'Diferencial' },
    { competencia: 'Técnica de execução', requisito: 'Diferencial' },
    { competencia: 'Interpretação de demanda', requisito: 'Diferencial' },
    { competencia: 'Organização', requisito: 'Diferencial' },
    { competencia: 'Gestão de pessoas', requisito: 'Diferencial' },
    { competencia: 'Usabilidade de ferramentas', requisito: 'Diferencial' },
    { competencia: 'Planejamento estratégico', requisito: 'Diferencial' },
    { competencia: 'Análise de riscos', requisito: 'Diferencial' },
    { competencia: 'Formação e desenvolvimento', requisito: 'Diferencial' },
    { competencia: 'Análise de performance', requisito: 'Diferencial' },
    { competencia: 'Relacionamento com cliente', requisito: 'Diferencial' },
    { competencia: 'Comunicação escrita', requisito: 'Diferencial' },
    { competencia: 'Tomada de decisão', requisito: 'Diferencial' },
    { competencia: 'Abordagem', requisito: 'Diferencial' },
    { competencia: 'Resolução de problemas', requisito: 'Diferencial' },
    { competencia: 'Padronização', requisito: 'Diferencial' },
    { competencia: 'Pesquisa', requisito: 'Diferencial' }
  
  ];

  calculateGrade(item: any) {
    switch (item.requisito) {
      case 'Obrigatório':
        switch (item.avaliacao) {
          case 'Muito Bom':
            item.nota = 10;
            break;
          case 'Bom':
            item.nota = 7;
            break;
          case 'Regular':
            item.nota = 5;
            break;
          case 'Insatisfatório':
            item.nota = 0;
            break;
          case 'Não Consta':
            item.nota = -10;
            break;
        }
        break;
      case 'Desejado':
        switch (item.avaliacao) {
          case 'Muito Bom':
            item.nota = 0.75;
            break;
          case 'Bom':
            item.nota = 0.5;
            break;
          case 'Regular':
            item.nota = 0.25;
            break;
          case 'Insatisfatório':
            item.nota = 0;
            break;
          case 'Não Consta':
            item.nota = 0;
            break;
        }
        break;
      case 'Diferencial':
        switch (item.avaliacao) {
          case 'Muito Bom':
            item.nota = 1;
            break;
          case 'Bom':
            item.nota = 0.75;
            break;
          case 'Regular':
            item.nota = 0.5;
            break;
          case 'Insatisfatório':
            item.nota = 0;
            break;
          case 'Não Consta':
            item.nota = 0;
            break;
        }
        break;
    }
  }

  notaSomada: number = 0;

  enviarAvaliacao() {
    this.notaSomada = 0;
    let notasPreenchidas = true;
  
    for (const item of this.items) {
      if (isNaN(item.nota)) {
        notasPreenchidas = false;
        break;
      }
      this.notaSomada += item.nota;
    }
  
    if (notasPreenchidas) {
      alert('Nota somada: ' + this.notaSomada);
    } else {
      alert('Preencha todas as notas antes de enviar a avaliação.');
    }
  }
  
}
