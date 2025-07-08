import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AvaliacoesService } from 'src/app/services/avaliacoes.service';


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
  usuarioSelecionado: string | null = null;
  nomeAvaliador: string = '';
  liderTeam: string = '';
  filteredUsers: any[] = [];
  isAdmin: boolean = false;
  somaMediasFinaisGrupoAEscopo: number = 0;
  mediaFinalPorTipoB: number = 0;
  mediaFinalPorTipoC: number = 0;
  somaMediasFinaisTotais: number = 0;
  avaliacaoDisponivel: boolean = true;
  ultimaAutoAvaliacao: any;

  @ViewChild('tableAvaliacao') tableAvaliacao: any;

  constructor(private userService: UserService, private http: HttpClient, private authService: AuthService, private router: Router, private avaliacoesService: AvaliacoesService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response;

        const liderLogadoJSON = localStorage.getItem('user');

        if (liderLogadoJSON) {
          const liderLogado = JSON.parse(liderLogadoJSON);
          this.liderTeam = liderLogado.team;

          // Verificar se o usuário é um Administrador
          if (liderLogado.accessLevel === 'Administrador') {
            this.isAdmin = true;
            // Se for Administrador, não aplicar a filtragem, mostrar todos os usuários
            this.filteredUsers = this.users.slice(); // Criar uma cópia do array de usuários
          } else {
            this.isAdmin = false;
            // Se não for Administrador, filtrar os usuários pelo time do líder
            this.filteredUsers = this.users.filter((user) => user.team === this.liderTeam);
          }
          this.removeDevTesteUser(); // Remover o usuário "Dev Nairuz" da listagem
          this.sortUsersAlphabetically(); // Ordenar os usuários em ordem alfabética
        }

      },
      (error: any) => {
        console.error(error);
      }
    );

  }

  removeDevTesteUser(): void {
    this.filteredUsers = this.filteredUsers.filter(user => user.name !== 'Dev Nairuz');
  }

  sortUsersAlphabetically(): void {
    this.filteredUsers.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }


  items: any[] = [

  ];

  itemsPorTime: { [key: string]: any[] } = {
    Desenvolvimento: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Desejado', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Desejado', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Desejado', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Desejado', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Desejado', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'HTML, CSS, JS', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Bootstrap', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'SASS/SCSS', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Magento (e-commerce)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Wordpress', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Linx (e-commerce)', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Vtex (e-commerce)', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Código Git/GitHub', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'React.js', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Angular.js', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Vue.js', requisito: 'Desejado', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Node.js', requisito: 'Desejado', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Next.js', requisito: 'Desejado', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Nest.js', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'TypeScript', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Outras plataformas de e-commerce', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês Básico ou intermediário', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Photoshop e/ou ferramentas de edição de imagens.', requisito: 'Desejado', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Banco de Dados (MySQL, Mongodb, Firebase, entre outros)', requisito: 'Desejado', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Otimização SEO on-site', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Noções de UX/ UI', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazos', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'SLA Chamados', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'SLA Chamados', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    DesignUIUX: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Desejado', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Desejado', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Desejado', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Desejado', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Desejado', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe XD/Figma', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Photoshop', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Illustrator', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teoria das cores', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Hierarquia textual', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês Básico ou intermediário', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Otimização SEO on-site', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataformas de e-commerce', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazos', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'SLA Chamados', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'SLA Chamados', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    CS: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'WordPress', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Magento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Linx', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Vtex', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'SEMRush', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Miro', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'WhatsApp', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Ligação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'CRM', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Frequência de reunião (calendários)', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Média de aprovação (Pautas)', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'SLA de resposta interna 24h', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Aprovação de calendário', requisito: 'Individual', peso: 'A', },
      // { tipo: 'individual', nome: 'Meta de Up Sell', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Aprovação de calendário', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Resposta NPS  > 70%', requisito: 'Indispensável', peso: 'B', },
      // { tipo: 'time', nome: 'Meta de Up Sell da equipe', requisito: 'Indispensável', peso: 'B', },
      // { tipo: 'time', nome: 'Meta de Backlinks da equipe', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    CSTec: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'WordPress', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Magento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Linx', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Vtex', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'SEMRush', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Miro', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'WhatsApp', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Ligação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'CRM', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Otimização SEO on-site', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Noções de UX/ UI', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo das tarefas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo contratual dos projetos (go-live)', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'SLA de resposta interna 24h', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Resposta NPS > 70%', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'SLA Chamados', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    Vendas: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'RD Station Marketing', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'RD Station CRM', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Linx Commerce – A nível de vendas para oferta da plataforma ', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Linx Impulse - A nível de vendas para oferta da plataforma', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'VTEX - A nível de vendas para oferta da plataforma', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Nuvem - A nível de vendas para oferta da plataforma ', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Meta individual de contratos fechados para as esteiras da empresa', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Taxa de conversão de 25%', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Manter o CRM atualizado em todas as etapas do funil', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Meta do time de contratos fechados para as esteiras da empresa', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'SLA de resposta dos Suspects 1 dia útil para agendamento de reuniões', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    PreVendas: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'RD Station Marketing', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'RD Station CRM', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Linx Commerce – A nível de vendas para oferta da plataforma ', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Linx Impulse - A nível de vendas para oferta da plataforma', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'VTEX - A nível de vendas para oferta da plataforma', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Nuvem - A nível de vendas para oferta da plataforma ', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inside Sales RD Station University', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Curso de Vendas Completo - Da prospecção ao fechamento', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Auréliuz - Língua portuguesa para empresas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inbound marketing', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'RD Station CRM na prática', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Serviço de vendas com RD Station CRM', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Outbound Sales', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'SEO do básico ao avançado', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Linx Commerce', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'VTEX Sales', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Meta de SDR: SLA de 1 dia útil dos Suspects que vierem do canal Marketing;', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Meta de BDR 06 oportunidades qualificadas por mês (Perfil Enterprise, A e B) válido para esteira de tecnologia e marketing', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Manter o CRM atualizado nas etapas correspondentes ao Pré Vendas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Manter a planilha de controle de OPS atualizada da entrada do suspect ao agendamento', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Dar lost  nos Suspect do canal marketing como não consegui qualificar, apenas após 5 dias úteis de tentativas e ter realizado o seguinte fluxo: 1 tentativa de ligação e 1 whatsapp depois do meio dia + 1 tentativa de contato e +1 Whatsapp', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Meta do time de contratos fechados para as esteiras da empresa', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    Redacao: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'WordPress', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Magento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Linx', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Vtex', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Yoast', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'SEMRush', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Campaign URL Builder', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Espanhol básico (desejável)', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês avançado', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Compressor de imagem', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Envato Elements', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Tempo de produção', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Média de aprovação', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Média de aprovação', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Tempo de produção', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazo', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    MidiasPagas: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Shopping', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Ads', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Tag Manager', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'LinkedIn Ads', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Meta Ads', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Bing Ads', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'SEMRush', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês avançado', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Espanhol básico (desejável)', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Atingimento dos objetivos da carteira', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Assertividade de projeção', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Atingimento dos objetivos da carteira', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    MidiasSociais: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Engajamento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'CTR', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Crescimento de seguidores', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visitas no perfil', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Impressões', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Performance de conteúdo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mlabs', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Photoshop', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Illustrator/Corel Draw', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'CapCut', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'META (Facebook e Instagram)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'TikTok', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'YouTube', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Linktree', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'LinkedIn', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês básico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Espanhol básico (desejável)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Tempo de produção', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Média de aprovação', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazos', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Média de aprovação', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Tempo de produção', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    InboundMarketing: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'RD Station', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'HubSpot', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês básico', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Tempo de produção', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Média de aprovação', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'GDR - RD Station da carteira', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Tempo de produção', requisito: 'Indispensável', peso: 'A', },
      { tipo: 'time', nome: 'Média de aprovação', requisito: 'Indispensável', peso: 'A', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'GDR - RD Station - Cliente Ativos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    DesignPublicitario: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Photoshop', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Ilustrator/Corel Draw', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Indesign', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe After Effects', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe XD/Figma', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Canva', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Domínio tipográfico', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teoria das cores', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Hierarquia textual', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês básico ou intermediário', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Tempo de produção', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Média de aprovação', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Design', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Média de aprovação', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Tempo de produção', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    TeamLeaderUIUX: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Emitir relatórios e pareceres acerca do progresso do time para o gestor', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Promover o treinamento da equipe, em todas as fases do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Buscar melhorias e boas práticas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ouvir e fornecer feedback com a equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Desenvolver a estratégia de trabalho, individualmente, com o gestor e a equipe, sempre com foco no objetivo principal, satisfação de nossos clientes', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicar de forma clara e dividir corretamente as tarefas do time', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Proporcionar as ferramentas necessárias para desenvolver o trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gerenciar o fluxo das tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Reportar os casos atípicos ao gestor do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe XD/Figma', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Photoshop', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Illustrator', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teoria das cores', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Hierarquia textual', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês Básico ou intermediário', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Otimização SEO on-site', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataformas de e-commerce', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazos', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'SLA Chamados', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'SLA Chamados', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    TeamLeaderMarketing: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Emitir relatórios e pareceres acerca do progresso do time para o gestor', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Promover o treinamento da equipe, em todas as fases do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Buscar melhorias e boas práticas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ouvir e fornecer feedback com a equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Desenvolver a estratégia de trabalho, individualmente, com o gestor e a equipe, sempre com foco no objetivo principal, satisfação de nossos clientes', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicar de forma clara e dividir corretamente as tarefas do time', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Proporcionar as ferramentas necessárias para desenvolver o trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gerenciar o fluxo das tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Reportar os casos atípicos ao gestor do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'CCG e MRR - RD Station - Realizar o acompanhamento junto ao líder, buscando estratégias e soluções para fortalecer e avançar em nossa parceria com a RD Station.', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Analisar, junto ao time, e otimizar campanhas de inbound marketing, focando em métricas chave como taxa de conversão, CAC, MQLs e SQLs para maximizar resultados.', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'RD Station', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'HubSpot', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'CRMs', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês básico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Tempo de produção', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Média de aprovação', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'GDR - RD Station', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazo', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'GDR - RD Station', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    TeamLeaderDesignPublicitario: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Emitir relatórios e pareceres acerca do progresso do time para o gestor', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Promover o treinamento da equipe, em todas as fases do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Buscar melhorias e boas práticas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ouvir e fornecer feedback com a equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Desenvolver a estratégia de trabalho, individualmente, com o gestor e a equipe, sempre com foco no objetivo principal, satisfação de nossos clientes', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicar de forma clara e dividir corretamente as tarefas do time', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Proporcionar as ferramentas necessárias para desenvolver o trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gerenciar o fluxo das tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Reportar os casos atípicos ao gestor do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Analytics', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Photoshop', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Ilustrator/Corel Draw', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe Indesign', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe After Effects', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Adobe XD/Figma', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Canva', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Domínio tipográfico', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teoria das cores', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Hierarquia textual', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês básico ou intermediário', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Tempo de produção', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Média de aprovação', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo', requisito: 'Individual', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Design', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Média de aprovação', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Tempo de produção', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    HeadMarketing: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Emitir relatórios e pareceres acerca do progresso do time para o gestor', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Promover o treinamento da equipe, em todas as fases do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Buscar melhorias e boas práticas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ouvir e fornecer feedback com a equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Desenvolver a estratégia de trabalho, individualmente, com o gestor e a equipe, sempre com foco no objetivo principal, satisfação de nossos clientes', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicar de forma clara e dividir corretamente as tarefas do time', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Proporcionar as ferramentas necessárias para desenvolver o trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gerenciar o fluxo das tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Reportar os casos atípicos ao gestor do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'CCG e MRR - RD Station - Realizar o acompanhamento junto ao líder, buscando estratégias e soluções para fortalecer e avançar em nossa parceria com a RD Station.', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Analisar, junto ao time, e otimizar campanhas de inbound marketing, focando em métricas chave como taxa de conversão, CAC, MQLs e SQLs para maximizar resultados.', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Workspace - Docs, Sheets e Slides', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês intermediário', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Espanhol básico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Make - automação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Garantir que os objetivos estratégicos sejam bem definidos, alcançados e alinhados com o planejamento estratégico da empresa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Assegurar que o planejamento estratégico de cada cliente seja seguido com excelência, garantindo os resultados previstos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Desenvolver e incentivar a equipe para que alcancem as metas estabelecidas, mantendo o alinhamento com os objetivos da empresa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Garantir que os profissionais menos experientes tenham o suporte necessário para se desenvolverem e atingirem seus objetivos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Ser o responsável pela qualidade da experiência do cliente, garantindo que as expectativas sejam atendidas e superadas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Manter os processos internos eficientes e otimizar continuamente as operações.', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Assegurar que novos clientes sejam adequadamente integrados à empresa, proporcionando uma experiência positiva desde o início', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Identificar e corrigir falhas nos processos a partir de dados reais de feedbacks (NPS), visando sempre a melhoria contínua', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Ser o elo de comunicação eficaz entre o time de marketing e as demais áreas da empresa, facilitando a integração e colaboração', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Utilizar dados concretos para tomar decisões que melhorem a satisfação do cliente e o sucesso da empresa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Assegurar que todos os processos e ferramentas estejam sendo utilizados de maneira eficiente e atualizada', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Certificar-se de que toda a equipe tenha as habilidades necessárias para utilizar as ferramentas corretamente e de forma eficiente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Marketing', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazo', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Atingimento dos objetivos da carteira (metas clientes)', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Burndown - Redação', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Burndown - Inbound', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Backlinks SEO', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    HeadDesign: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Emitir relatórios e pareceres acerca do progresso do time para o gestor', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Promover o treinamento da equipe, em todas as fases do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Buscar melhorias e boas práticas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ouvir e fornecer feedback com a equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Desenvolver a estratégia de trabalho, individualmente, com o gestor e a equipe, sempre com foco no objetivo principal, satisfação de nossos clientes', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicar de forma clara e dividir corretamente as tarefas do time', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Proporcionar as ferramentas necessárias para desenvolver o trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gerenciar o fluxo das tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Reportar os casos atípicos ao gestor do projeto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Workspace - Docs, Sheets e Slides', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Looker Studio', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês intermediário', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Espanhol básico', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Make - automação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Garantir que todos os projetos de design estejam alinhados com a identidade visual da empresa, mantendo um padrão de qualidade elevado', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Assegurar que a experiência do usuário nos produtos da empresa seja otimizada com base em dados de pesquisa e testes', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Garantir que a equipe crie designs responsivos e intuitivos, com um foco contínuo na melhoria dos fluxos de navegação e protótipos de alta qualidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Criar soluções visuais inovadoras para campanhas e materiais publicitários que se destaquem nas plataformas digitais e impressas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Garantir que os materiais entregues estejam de acordo com os padrões e requisitos estabelecidos para comunicação externa e interna', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Manter uma comunicação eficiente com outros times, alinhando os objetivos de design com as metas e demandas de outras áreas da empresa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Manter-se atualizado sobre as tendências de design e inovação para aplicar novas ideias no trabalho da equipe e nos projetos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Desenvolver as habilidades da equipe, assegurando que o time esteja capacitado e alinhado com os objetivos da empresa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Garantir que as entregas sejam de alto impacto, por meio de uma colaboração eficaz entre as equipes de design e outras áreas da empresa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Garantir que as publicações atendam aos padrões de qualidade visual e ao contexto solicitado', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Assegurar que o conteúdo visual esteja bem organizado, sendo de fácil leitura e com boa apresentação visual', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Aplicar as melhores práticas de design e UX/UI, incorporando inovações tecnológicas no trabalho da equipe e garantindo que a empresa se mantenha competitiva', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Desenvolver e motivar a equipe, colaborando ativamente na gestão de talentos e no desenvolvimento do time', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Manter um acompanhamento constante sobre o desempenho da área, promovendo ajustes contínuos nas estratégias de design', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Design', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Design', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    PMO: [
      { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Liderança', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Autonomia', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Controle emocional', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Visão holística', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Postura e ética de trabalho', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relação interpessoal', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de métricas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de dados', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnica de execução', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Interpretação de demanda', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Gestão de pessoas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Usabilidade de ferramentas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Planejamento estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Análise de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Formação e desenvolvimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Relacionamento com cliente', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Comunicação escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Abordagem', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Padronização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Pesquisa', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Confiabilidade', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Técnicas de redação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Produção de texto', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Domínio da gramática', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Concordância (gramática)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'competencia', nome: 'Negociação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Pós-graduação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Especialização', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Treinamentos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de ferramentas', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Certificações de área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos/treinamentos da área de atuação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Cursos / treinamentos sobre gestão', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Atualização de cursos / treinamentos', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'qualificacao', nome: 'Participação em feiras, eventos e workshops', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Windows', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Microsoft Office (pacote)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Google Workspace - Docs, Sheets e Slides', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Looker Studio', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Teams', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Inglês intermediário', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Espanhol básico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'WordPress', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Magento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Linx', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Plataforma Vtex', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'WhatsApp', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Ligação', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Otimização SEO on-site', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'ferramenta', nome: 'Noções de UX/ UI', requisito: 'Diferencial', peso: 'A', },
      { tipo: 'comportamental', nome: 'Absenteísmo (INFORMATIVO)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'comportamental', nome: 'Inovação', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Alocação de horas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Cumprimento de prazo das tarefas', requisito: 'Individual', peso: 'A', },
      { tipo: 'individual', nome: 'Boa comunicação verbal e escrita', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Gestão de projetos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Conhecimento em metodologias ágeis e tradicionais (Scrum, Kanban, PMBOK)', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Planejamento e organização', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Capacidade analítica e resolução de problemas', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Gestão de riscos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Habilidade com ferramentas de gestão de projetos (Clickup, Miro, MS Project);', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Facilidade para trabalhar com dados e relatórios', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Negociação e mediação de conflitos', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Visão estratégica', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Capacidade de lidar com múltiplos projetos simultaneamente;', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Habilidade em tomada de decisão', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Pensamento crítico e estratégico', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Atenção aos detalhes e alto nível de organização;', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Habilidade para resolver problemas de forma eficaz', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Capacidade de influenciar e engajar equipes', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'individual', nome: 'Flexibilidade para se adaptar a mudanças e novas demandas do negócio', requisito: 'Obrigatório', peso: 'A', },
      { tipo: 'time', nome: 'Churn rate - Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'NPS - Atendimento em Tecnologia', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Alocação de horas time', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'SLA Chamados', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Cumprimento de prazo contratual dos projetos (go-live)', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'time', nome: 'Resposta NPS > 70%', requisito: 'Indispensável', peso: 'B', },
      { tipo: 'empresa', nome: 'MRR (Monthly Recurring Revenue)', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'Indispensável', peso: 'C', },
      { tipo: 'empresa', nome: 'Margem de Lucro', requisito: 'Indispensável', peso: 'C', },
    ],
    // Outros times e seus respectivos itens
  };

//Método para atualizar o usuário selecionado de acordo com o select feio no front.
  atualizarUsuarioSelecionado(event: any) {
    const usuarioSelecionado = event.target.value;
    const setorSelecionado = event.target.options[event.target.selectedIndex].getAttribute('data-setor');
    
    console.log('Usuário selecionado:', usuarioSelecionado);
    console.log('Setor do usuário:', setorSelecionado);
    
    // Atualizar a lista de itens com base no time selecionado
    this.usuarioSelecionado = usuarioSelecionado;
    this.items = this.itemsPorTime[setorSelecionado];
    

    if (!this.items || this.items.length === 0) {
      this.items = []; // Limpar a lista de itens
      this.avaliacaoDisponivel = false;
      console.log('A avaliação ainda não está disponível para seu time');
    } else {
      this.avaliacaoDisponivel = true;
    }
    this.limparNotasAutoAvaliacao();
    this.carregarUltimaAutoAvaliacao();

  }

  limparNotasAutoAvaliacao() {
    this.ultimaAutoAvaliacao = null; 
  }

// Método para carregar a última autoavaliação do funcionário selecionado
carregarUltimaAutoAvaliacao(): void {
  if (this.usuarioSelecionado) {
    this.http.get(environment.URL_API + `/api/autoavaliacoes?funcionario=${this.usuarioSelecionado}&_sort=data&_order=desc&_limit=1`)
      .subscribe((response: any) => {
        this.ultimaAutoAvaliacao = response[response.length - 1]; // A resposta é um array, então pegamos o último item
        console.log('Última autoavaliação:', this.ultimaAutoAvaliacao);
      }, (error) => {
        console.log('O usuário não possui autoavaliação');
      });
  }
}

// Método para verificar se o índice do item atual é igual ao índice da nota
isSameIndex(index: number, notaIndex: number): boolean {
  return index === notaIndex;
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
        case 'Indispensável':
          switch (item.avaliacao) {
            case 'Satisfatório':
              item.nota = 10;
              break;
            case 'Insatisfatório':
              item.nota = 0;
              break;
          }
        break;
        case 'Individual':
          switch (item.avaliacao) {
            case 'Satisfatório':
              item.nota = 10;
              break;
            case 'Insatisfatório':
              item.nota = -10;
              break;
          }
        break;
    }
    this.updateAvaliacaoNotas();

  }



   // Função para atualizar as notas após cada a avaliação de item
   updateAvaliacaoNotas() {
    this.avaliacoes = this.items.map((item) => ({
      nome: item.nome,
      nota: item.nota,
      requisito: item.requisito,
      avaliacao: item.avaliacao,
      tipo: item.tipo,
    }));
    console.log(this.avaliacoes)


      // Criar objetos separados para armazenar as notas totais por tipo para requisitos "Obrigatório", "nulo", "desejado" e "diferencial"
      const notasObrigatorioNuloPorTipo: { [key: string]: { quantidade: number; notaTotal: number } | undefined } = {};
      const notasDesejadoPorTipo: { [key: string]: { quantidade: number; notaTotal: number } | undefined } = {};
      const notasDiferencialPorTipo: { [key: string]: { quantidade: number; notaTotal: number } | undefined } = {};

      // Percorrer os itens e somar as notas dos itens com requisito "Obrigatório", "nulo", "desejado" ou "diferencial" por tipo
      for (const item of this.avaliacoes) {
        if (item.requisito === 'Obrigatório' || item.requisito === 'Individual' || item.requisito === 'Indispensável' ) {
          if (!notasObrigatorioNuloPorTipo[item.tipo]) {
            notasObrigatorioNuloPorTipo[item.tipo] = { quantidade: 1, notaTotal: item.nota };
          } else {
            notasObrigatorioNuloPorTipo[item.tipo]!.quantidade++;
            notasObrigatorioNuloPorTipo[item.tipo]!.notaTotal += item.nota;
          }
        } else if (item.requisito === 'Desejado') {
          if (!notasDesejadoPorTipo[item.tipo]) {
            notasDesejadoPorTipo[item.tipo] = { quantidade: 1, notaTotal: item.nota };
          } else {
            notasDesejadoPorTipo[item.tipo]!.quantidade++;
            notasDesejadoPorTipo[item.tipo]!.notaTotal += item.nota;
          }
        } else if (item.requisito === 'Diferencial') {
          if (!notasDiferencialPorTipo[item.tipo]) {
            notasDiferencialPorTipo[item.tipo] = { quantidade: 1, notaTotal: item.nota };
          } else {
            notasDiferencialPorTipo[item.tipo]!.quantidade++;
            notasDiferencialPorTipo[item.tipo]!.notaTotal += item.nota;
          }
        }
      }

      // Definir os tipos desejados para calcular a média final
      
      const tiposGrupoA = ['competencia', 'qualificacao', 'ferramenta', 'comportamental', 'individual'];
      const tiposGrupoB = 'time';
      const tiposGrupoC = 'empresa';

      let somaMediasFinaisGrupoA = 0;

      // Exibindo as notas somadas, notas máximas por grupo e notas por cada requisito.
      for (const tipo in notasObrigatorioNuloPorTipo) {
        if (tiposGrupoA.includes(tipo)) {
          const notaObrigatorioNulo = notasObrigatorioNuloPorTipo[tipo]?.notaTotal || 0;
          const notaDesejado = notasDesejadoPorTipo[tipo]?.notaTotal || 0;
          const notaDiferencial = notasDiferencialPorTipo[tipo]?.notaTotal || 0;
          const qtdMaximaPorTipo = notasObrigatorioNuloPorTipo[tipo]!.quantidade * 10;
          const mediaObrigatoria = (notaObrigatorioNulo / qtdMaximaPorTipo) * 10;
          const mediaDiferencial = Math.min(notaDiferencial, 1);
          const mediaDesejado = Math.min(notaDesejado, 0.75);
          const mediaFinalPorTipo = Math.min(mediaObrigatoria + mediaDiferencial + mediaDesejado, 10);

          console.log(`Tipo: %c${tipo}%c, Quantidade: ${notasObrigatorioNuloPorTipo[tipo]!.quantidade}, Nota Total Obrigatório: ${notaObrigatorioNulo}, Nota Total Desejado: ${notaDesejado}, Nota Total Diferencial: ${notaDiferencial}, Nota Máxima Do Grupo: ${qtdMaximaPorTipo}, Média Obrigatória: ${mediaObrigatoria}, Média Desejado: ${mediaDesejado}, Média Diferencial: ${mediaDiferencial}, Média Final: ${mediaFinalPorTipo}`, 'font-weight: bold; color: blue', 'font-weight: normal');

          somaMediasFinaisGrupoA += mediaFinalPorTipo / 5;

          this.somaMediasFinaisGrupoAEscopo = parseFloat(somaMediasFinaisGrupoA.toFixed(2));

          console.log('Soma das 5 medias para formar a média individual:' + this.somaMediasFinaisGrupoAEscopo);

        } else if (tipo === tiposGrupoB) {
          const notaObrigatorioNulo = notasObrigatorioNuloPorTipo[tipo]?.notaTotal || 0;
          const notaDesejado = notasDesejadoPorTipo[tipo]?.notaTotal || 0;
          const notaDiferencial = notasDiferencialPorTipo[tipo]?.notaTotal || 0;
          const qtdMaximaPorTipo = notasObrigatorioNuloPorTipo[tipo]!.quantidade * 10;
          const mediaObrigatoria = (notaObrigatorioNulo / qtdMaximaPorTipo) * 10;
          const mediaDiferencial = Math.min(notaDiferencial, 1);
          const mediaDesejado = Math.min(notaDesejado, 0.75);
          this.mediaFinalPorTipoB = mediaObrigatoria + mediaDiferencial + mediaDesejado;

          console.log(`Tipo: %c${tipo}%c, Quantidade: ${notasObrigatorioNuloPorTipo[tipo]!.quantidade}, Nota Total Obrigatório: ${notaObrigatorioNulo}, Nota Total Desejado: ${notaDesejado}, Nota Total Diferencial: ${notaDiferencial}, Nota Máxima Do Grupo: ${qtdMaximaPorTipo}, Média Obrigatória: ${mediaObrigatoria}, Média Desejado: ${mediaDesejado}, Média Diferencial: ${mediaDiferencial}, Média Final: ${this.mediaFinalPorTipoB}`, 'font-weight: bold; color: blue', 'font-weight: normal');

        } else if (tipo === tiposGrupoC) {
          const notaObrigatorioNulo = notasObrigatorioNuloPorTipo[tipo]?.notaTotal || 0;
          const notaDesejado = notasDesejadoPorTipo[tipo]?.notaTotal || 0;
          const notaDiferencial = notasDiferencialPorTipo[tipo]?.notaTotal || 0;
          const qtdMaximaPorTipo = notasObrigatorioNuloPorTipo[tipo]!.quantidade * 10;
          const mediaObrigatoria = (notaObrigatorioNulo / qtdMaximaPorTipo) * 10;
          const mediaDiferencial = Math.min(notaDiferencial, 1);
          const mediaDesejado = Math.min(notaDesejado, 0.75);
          this.mediaFinalPorTipoC = mediaObrigatoria + mediaDiferencial + mediaDesejado;

          console.log(`Tipo: %c${tipo}%c, Quantidade: ${notasObrigatorioNuloPorTipo[tipo]!.quantidade}, Nota Total Obrigatório: ${notaObrigatorioNulo}, Nota Total Desejado: ${notaDesejado}, Nota Total Diferencial: ${notaDiferencial}, Nota Máxima Do Grupo: ${qtdMaximaPorTipo}, Média Obrigatória: ${mediaObrigatoria}, Média Desejado: ${mediaDesejado}, Média Diferencial: ${mediaDiferencial}, Média Final: ${this.mediaFinalPorTipoC}`, 'font-weight: bold; color: blue', 'font-weight: normal');
        }
      }

      this.somaMediasFinaisTotais = (this.somaMediasFinaisGrupoAEscopo / 10 * 3) + (this.mediaFinalPorTipoB / 10 * 2) + (this.mediaFinalPorTipoC / 10 * 5);;
      console.log('Soma das médias finais de todos os grupos:', this.somaMediasFinaisTotais);

    
  
  }


  enviarAvaliacao() {

    const selectsPreenchidos = this.avaliacoes.every(item => {
      return (
        item.avaliacao === 'Muito Bom' ||
        item.avaliacao === 'Bom' ||
        item.avaliacao === 'Regular' ||
        item.avaliacao === 'Insatisfatório' ||
        item.avaliacao === 'Não Consta' ||
        item.avaliacao === 'Satisfatório'
      );
    });
  
    if (!selectsPreenchidos) {
      alert('Por favor, preencha todas as notas antes de enviar a avaliação.');
      return; // Impede o envio da avaliação se algum select não for preenchido corretamente
    }
    // Obter o usuário avaliador logado do localStorage
    const avaliadorLogadoJSON = localStorage.getItem('user');

    if (avaliadorLogadoJSON) {
      const avaliadorLogado = JSON.parse(avaliadorLogadoJSON);
      this.nomeAvaliador = avaliadorLogado.name;
      console.log('Avaliador logado:', this.nomeAvaliador);
    }
    

    // Formatar data para padrão brasileiro
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();
  
    // Itens que serao enviados para o servidor
    const funcionario = this.usuarioSelecionado;
    const avaliador = this.nomeAvaliador;
    const mediaIndividual = this.somaMediasFinaisGrupoAEscopo;
    const mediaTime = this.mediaFinalPorTipoB;
    const mediaEmpresa = this.mediaFinalPorTipoC;
    const mediaFinalGeral = this.somaMediasFinaisTotais;
    const dataFormatada = `${dia}/${mes}/${ano}`;
    

    const dadosAvaliacao = {
      funcionario,
      avaliador,
      dataFormatada,
      notas: this.avaliacoes.map((item) => ({ nome: item.nome, requisito: item.requisito, avaliacao: item.avaliacao, nota: item.nota })),
      mediaIndividual,
      mediaTime,
      mediaEmpresa,
      mediaFinalGeral
    };

    console.log('Dados enviados para o banco:' + JSON.stringify(dadosAvaliacao, null, 2));

    // Chamar a API para salvar a avaliação
    this.salvarAvaliacao(dadosAvaliacao);
 
  }

  
  salvarAvaliacao(dadosAvaliacao: any) {
    // Chamar a API usando o HttpClient
    this.http.post(environment.URL_API + '/api/avaliacao', dadosAvaliacao)
      .subscribe(
        response => {
          console.log('Avaliação enviada com sucesso!', response);
          alert('Avaliação enviada com sucesso!')
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Erro ao enviar a avaliação.', error);
        }
      );
  }

}
