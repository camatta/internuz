import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css']
})

export class AvaliacoesComponent implements OnInit {

  users: any[] = [];
  avaliacoes: any[] = [];
  selectedUser: string = '';
  selectedUserNote: string = '';
  usuarioSelecionado: string ='';

  constructor(private userService: UserService, private http: HttpClient, private authService: AuthService) {}

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
    { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
    { tipo: 'qualificacao', nome: 'Participação em eventos', requisito: 'Diferencial', peso: 'A', },
    { tipo: 'qualificacao', nome: 'Participação em workshops', requisito: 'Diferencial', peso: 'A', },
    { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'ferramenta', nome: 'Banco de Dados MySQL', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'ferramenta', nome: 'Otimização SEO on-site', requisito: 'Diferencial', peso: 'A', },
    { tipo: 'ferramenta', nome: 'Noções de UX/ UI', requisito: 'Diferencial', peso: 'A', },
    { tipo: 'comportamental', nome: 'Absenteísmo', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
    { tipo: 'individual', nome: 'Alocação de horas', requisito: 'nulo', peso: 'A', },
    { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'nulo', peso: 'A', },
    { tipo: 'individual', nome: 'Cumprimento de prazos', requisito: 'nulo', peso: 'A', },
    { tipo: 'individual', nome: 'SLA Chamados', requisito: 'nulo', peso: 'A', },
    { tipo: 'time', nome: 'Churn rate - Tecnologia', requisito: 'nulo', peso: 'B', },
    { tipo: 'time', nome: 'NPS - Tecnologia', requisito: 'nulo', peso: 'B', },
    { tipo: 'time', nome: 'Alocação de horas time', requisito: 'nulo', peso: 'B', },
    { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'nulo', peso: 'B', },
    { tipo: 'time', nome: 'SLA Chamados', requisito: 'nulo', peso: 'B', },
    { tipo: 'empresa', nome: 'Percentual de Churn MRR (Monthly Recurring Revenue)', requisito: 'nulo', peso: 'C', },
    { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'nulo', peso: 'C', },
  ];

//Método para atualizar o usuário selecionado de acordo com o select feio no front.
  atualizarUsuarioSelecionado(event: any) {
    const usuarioSelecionado = event.target.value;
    const setorSelecionado = event.target.options[event.target.selectedIndex].getAttribute('data-setor');
    
    console.log('Usuário selecionado:', usuarioSelecionado);
    console.log('Setor do usuário:', setorSelecionado);
    
    // Restante do código...
  }

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
        case 'nulo':
          switch (item.avaliacao) {
            case 'Satisfatório':
              item.nota = 10;
              break;
            case 'Insatisfatório':
              item.nota = 0;
              break;
          }
        break;
    }
    this.updateAvaliacaoNotas();

  }

  enviarAvaliacao() {
    console.log('clicou em enviar');
    if (!this.usuarioSelecionado) {
      alert('Selecione um funcionário antes de enviar a avaliação.');
      return;
    }
    console.log('Usuário selecionado:', this.usuarioSelecionado);

  }

   // Função para atualizar as notas após cada a avaliação de item
   updateAvaliacaoNotas() {
    this.avaliacoes = this.items.map((item) => ({
      nome: item.nome,
      nota: item.nota
    }));
  
  }


  
  salvarAvaliacao(avaliacaoData: any) {
    // Chamar a API usando o HttpClient
    this.http.post(environment.URL_API + '/api/avaliacao', avaliacaoData)
      .subscribe(
        response => {
          console.log('Avaliação enviada com sucesso!', response);
          alert('Avaliação enviada com sucesso. Veja o resultado no histórico do funcionário.')
          // Faça qualquer outra ação necessária após salvar a avaliação, como redirecionar para outra página
        },
        error => {
          console.error('Erro ao enviar a avaliação.', error);
          // Trate o erro de acordo com a necessidade do seu aplicativo
        }
      );
  }

}
