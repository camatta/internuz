import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css']
})

export class AvaliacoesComponent implements OnInit {
  users: any[] = [];

  selectedUser: string = '';
  selectedUserNote: string = '';

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
    this.calculateMaxPoints();
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
    { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Desejado' },
    { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Desejado' },
    { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Persuasão', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Discrição', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Criatividade', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Liderança', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Autonomia', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Visão holística', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Postura', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Organização', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Análise de performance', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Abordagem', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Padronização', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Inovação', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Negociação', requisito: 'Diferencial' },
    { tipo: 'competencia', nome: 'Ética de trabalho', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Cursos/treinamentos sobre postura profissional', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Participação em feiras', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Participação em eventos', requisito: 'Diferencial' },
    { tipo: 'qualificacao', nome: 'Participação em workshops', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Windows', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Teams', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'WordPress', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Magento', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Plataforma Magento', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Plataforma Linx', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Plataforma Vtex', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Yoast', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'SEMRush', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Moz', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Campaign URL Builder', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Envato Elements', requisito: 'Diferencial' },
    { tipo: 'comportamental', nome: 'Absenteísmo', requisito: 'Diferencial' },
    { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Diferencial' },
    { tipo: 'comportamental', nome: 'Inovação', requisito: 'Diferencial' },
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

  calculateMaxPoints() {
    let maxPoints = 0;
  
    for (const item of this.items) {
      switch (item.requisito) {
        case 'Obrigatório':
          maxPoints += 10;
          break;
        case 'Desejado':
          maxPoints += 0.75;
          break;
        case 'Diferencial':
          maxPoints += 1;
          break;
        default:
          break;
      }
    }
    return maxPoints;
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
      const maxPoints = this.calculateMaxPoints();
      const media = (this.notaSomada / maxPoints) * 10;
      const mensagem = `Sua nota foi ${this.notaSomada.toFixed(2)}, e sua média foi ${media.toFixed(2)}.`;
      alert(mensagem);
    } else {
      alert('Preencha todas as notas antes de enviar a avaliação.');
    }
  }

 
}
