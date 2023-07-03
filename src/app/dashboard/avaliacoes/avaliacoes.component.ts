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
    { tipo: 'competencia', nome: 'Atualização', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Comunicação verbal', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Disponibilidade', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Gestão de tarefas', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Ser prestativo', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Flexibilidade', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Saber ouvir', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Comprometimento', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Trabalho em equipe', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Persuasão', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Discrição', requisito: 'Obrigatório' },
    { tipo: 'competencia', nome: 'Criatividade', requisito: 'Obrigatório' },
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
    { tipo: 'qualificacao', nome: 'Graduação', requisito: 'Obrigatório' },
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
    { tipo: 'ferramenta', nome: 'ClickUp', requisito: 'Obrigatório' },
    { tipo: 'ferramenta', nome: 'Mywork', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'HTML, CSS, JS', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Bootstrap', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'SASS/SCSS', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Magento (e-commerce)', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Wordpress', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Linx (e-commerce)', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Vtex (e-commerce)', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Código Git/GitHub', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'React.js', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Angular.js', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Vue.js', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Node.js', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Nest.js', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'TypeScript', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Outras plataformas de e-commerce', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Inglês Básico ou intermediário', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Photoshop', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Banco de Dados MySQL', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Otimização SEO on-site', requisito: 'Diferencial' },
    { tipo: 'ferramenta', nome: 'Noções de UX/ UI', requisito: 'Diferencial' },
    { tipo: 'comportamental', nome: 'Absenteísmo', requisito: 'Diferencial' },
    { tipo: 'comportamental', nome: 'Comprometimento', requisito: 'Obrigatório' },
    { tipo: 'comportamental', nome: 'Inovação', requisito: 'Diferencial' },
    { tipo: 'individual', nome: 'Alocação de horas', requisito: 'nulo' },
    { tipo: 'individual', nome: 'Acuracidade no registro de ponto', requisito: 'nulo' },
    { tipo: 'individual', nome: 'Cumprimento de prazos', requisito: 'nulo' },
    { tipo: 'individual', nome: 'SLA Chamados', requisito: 'nulo' },
    { tipo: 'time', nome: 'Churn rate - Tecnologia', requisito: 'nulo' },
    { tipo: 'time', nome: 'NPS - Tecnologia', requisito: 'nulo' },
    { tipo: 'time', nome: 'Alocação de horas time', requisito: 'nulo' },
    { tipo: 'time', nome: 'Cumprimento de prazos', requisito: 'nulo' },
    { tipo: 'time', nome: 'SLA Chamados', requisito: 'nulo' },
    { tipo: 'empresa', nome: 'Percentual de Churn MRR (Monthly Recurring Revenue)', requisito: 'nulo' },
    { tipo: 'empresa', nome: 'Churn Rate - Geral', requisito: 'nulo' },
  ];

  // Função para atualizar as notas após cada a avaliação de item
  updateAvaliacaoNotas() {
    this.avaliacoes = this.items.map((item) => ({
      nome: item.nome,
      nota: item.nota
    }));
  
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


    // console.log(item.avaliacao_notas);
  }

  atualizarUsuarioSelecionado(event: any) {
    const selectedIndex = event.target.selectedIndex;
    const usuarioSelecionado = event.target.options[selectedIndex].value;
    this.usuarioSelecionado = usuarioSelecionado;
  }

  enviarAvaliacao() {
    const notasPorTipo: { [key: string]: number } = {};
    const mediasPorTipo: { [key: string]: number } = {};
    const totalPontosDisponiveis: { [key: string]: number } = {};
    let totalPesos = 0; // Variável para somar os pesos dos itens
  
    for (const item of this.items) {
      if (item.nota === undefined || isNaN(item.nota)) {
        console.log('Por favor, preencha todas as notas antes de enviar a avaliação.');
        return;
      }
  
      this.calculateGrade(item);
  
      if (!notasPorTipo[item.tipo]) {
        notasPorTipo[item.tipo] = 0;
        totalPontosDisponiveis[item.tipo] = 0;
      }
  
      notasPorTipo[item.tipo] += item.nota;
  
      if (item.requisito === 'Obrigatório' || item.requisito === 'nulo') {
        totalPontosDisponiveis[item.tipo] += 10;
      }
  
      totalPesos += this.getWeightForItemType(item.tipo); // Adiciona o peso do item aos pesos totais
    }
  
    let totalNotas = 0;
    let totalItens = 0;
  
    for (const tipo in notasPorTipo) {
      const totalPontos = totalPontosDisponiveis[tipo];
      const media = Math.min((notasPorTipo[tipo] / totalPontos) * 10, 10);
  
      const peso = this.getWeightForItemType(tipo); // Obtém o peso para o tipo de item
  
      mediasPorTipo[tipo] = media * peso; // Multiplica a média pelo peso
      totalNotas += notasPorTipo[tipo] * peso; // Multiplica a nota pelo peso
      totalItens += totalPontos / 10 * peso; // Multiplica o total de pontos pelo peso
  
      console.log(`Nota para o tipo ${tipo}: ${notasPorTipo[tipo].toFixed(2)}`);
      console.log(`Nota máxima que pode ser alcançada para o tipo ${tipo}: ${totalPontos}`);
      console.log(`Média para o tipo ${tipo}: ${media.toFixed(2)}`);
    }
  
    const mediaTotal = Math.min(parseFloat((totalNotas / totalItens).toFixed(2)), 10);
    console.log(`Média total: ${mediaTotal}`);
  
    const usuarioSelecionado = this.usuarioSelecionado;
  
    // Formatar data para padrão brasileiro
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();
  
    const dataFormatada = `${dia}/${mes}/${ano}`;
  
    const usuarioLogado = this.authService.getUserName();
  
    this.updateAvaliacaoNotas();

    let performance: string;

    if (mediaTotal <= 7) {
      performance = "Prata";
    } else if (mediaTotal <= 9) {
      performance = "Ouro";
    } else {
      performance = "Diamante";
    }
  
    console.log(`Performance do usuário: ${performance}`);
  
    // Objeto com os dados da avaliação
    const avaliacaoData = {
      mediaFinal: mediaTotal,
      dataAvaliacao: dataFormatada,
      usuario: usuarioSelecionado,
      avaliador: usuarioLogado,
      notas: this.avaliacoes.map((item) => ({ nome: item.nome, nota: item.nota }))
    };
  
    // Chamar a API para salvar a avaliação
    this.salvarAvaliacao(avaliacaoData);
  }
  
  getWeightForItemType(tipo: string): number {
    // Mapear os tipos de item para seus respectivos pesos
    const pesoPorTipo: { [key: string]: number } = {
      competencia: 3,
      qualificação: 3,
      ferramenta: 3,
      comportamental: 3,
      individual: 3,
      time: 2,
      empresa: 5
    };
  
    // Retorna o peso para o tipo de item
    return pesoPorTipo[tipo] || 1; // Se o tipo não estiver mapeado, assume-se um peso padrão de 1
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
