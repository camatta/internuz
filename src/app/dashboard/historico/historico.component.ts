import { Component, OnInit } from '@angular/core';
import { AvaliacoesService } from 'src/app/services/avaliacoes.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})


export class HistoricoComponent implements OnInit {
  historicoAvaliacoes: any[] = [];
  nomeUsuario: string = this.authService.getUserName(); // Nome do usuário para obter o histórico de avaliações
  isAuthorized: boolean = false; // Propriedade para controlar a autorização do usuário
  users: any[] = []; // Lista de usuários para o select
  liderTeam: string = '';
  filteredUsers: any[] = [];
  isAdmin: boolean = false;
  exibirDetalhes = false;

  constructor(private avaliacoesService: AvaliacoesService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.checkAuthorization();
    this.getUsers();
    this.getHistoricoAvaliacoes();
  }

  checkAuthorization(): void {
    const accessLevel = this.authService.getAccessLevel(); // Método para obter o nível de acesso do usuário
    if (accessLevel === 'Administrador') {
      this.isAuthorized = true;
    } else if (accessLevel === 'Líder de Equipe') {
      this.isAuthorized = true;
      const userLogadoJSON = localStorage.getItem('user');
      if (userLogadoJSON) {
        const userLogado = JSON.parse(userLogadoJSON);
        this.liderTeam = userLogado.team;
      }
    }
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        if (this.isAuthorized && this.authService.getAccessLevel() === 'Líder de Equipe') {
          // Filtrar os usuários para exibir somente os do mesmo time do líder
          this.filteredUsers = users.filter(user => user.team === this.liderTeam);
        } else {
          this.filteredUsers = users;
        }
        this.removeDevTesteUser(); // Remover o usuário "Dev Nairuz" da listagem
        this.sortUsersAlphabetically(); // Ordenar os usuários em ordem alfabética
      },
      (error: any) => {
        console.error('Erro ao obter lista de usuários', error);
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

  getHistoricoAvaliacoes(nomeUsuario?: string): void {
    if (this.isAuthorized) {
      // Verifica se foi fornecido um nome de usuário, caso contrário, usa o nome do usuário selecionado no select
      const usuario = nomeUsuario ? nomeUsuario : this.nomeUsuario;
      
      // Lógica para obter histórico de avaliações do usuário selecionado
      this.avaliacoesService.getHistoricoAvaliacoesPorUsuario(usuario).subscribe(
        (historicoAvaliacoes: any[]) => {
          this.historicoAvaliacoes = historicoAvaliacoes;
          console.log(historicoAvaliacoes);
        },
        (error: any) => {
          console.error('Erro ao obter histórico de avaliações', error);
        }
      );
    } else {
      // Lógica para obter o histórico de avaliações apenas para o usuário logado
      const usuarioLogado = this.authService.getUserName();
      this.avaliacoesService.getHistoricoAvaliacoesPorUsuario(usuarioLogado).subscribe(
        (historicoAvaliacoes: any[]) => {
          this.historicoAvaliacoes = historicoAvaliacoes;
          console.log(historicoAvaliacoes);
        },
        (error: any) => {
          console.error('Erro ao obter histórico de avaliações', error);
        }
      );
    }
  }


  downloadRelatorio(avaliacao: any) {
    const doc = new jsPDF();
  
    // Adicionar cabeçalho com logo e título
    doc.setFillColor(0, 187, 185); // Cor de fundo do cabeçalho
    doc.setDrawColor(0, 0, 0); // Cor da borda preta
  
    // Adicionar retângulo para o cabeçalho
    doc.rect(10, 10, 190, 20, 'FD');

    // Definir a posição do logo
    const logoX = 13; // Posição horizontal do logo (ajuste conforme necessário)
    const logoY = 16; // Posição vertical do logo (ajuste conforme necessário)
  
    // Adicionar logo
    const logoPath = '../../../assets/images/Logo-Nairuz-Branco.png';
    const logoWidth = 40; // Largura do logo SVG no PDF
    const logoHeight = 7; // Altura do logo SVG no PDF
    doc.addImage(logoPath, 'PNG', logoX, logoY, logoWidth, logoHeight);
  
    // Configurar estilo do texto
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255); // Cor do texto branco
    doc.setFontSize(14); // Tamanho da fonte
  
    const fontSize = doc.getFontSize();
    const title = 'AVALIAÇÃO DE DESEMPENHO';
    const titleWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = 14 + logoHeight / 2 + fontSize / 4;
    doc.text(title, titleX, titleY);

    doc.setFont('helvetica', 'normal');

    // Adicionar informações gerais em tabela
    function addTableCell(doc: jsPDF, text: string, x: number, y: number, width: number, height: number, align: 'left' | 'center' | 'right' = 'left', marginLeft: number = 3, backgroundColor?: [number, number, number] ) {
      const originalX = x; // Salva a posição original
      doc.setFillColor(255, 255, 255);
      if (backgroundColor) {
        doc.setFillColor(...backgroundColor);
        doc.rect(x, y, width, height, 'F');
      } else {
        doc.rect(x, y, width, height);
      }
      doc.setTextColor(0, 0, 0);
      doc.setDrawColor(0, 0, 0);
      doc.setFontSize(10);
    
      x += marginLeft;

      doc.rect(originalX, y, width + marginLeft, height, 'FD');
    
      const fontSize = doc.getFontSize();
      const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
      const textX = x + (align === 'center' ? (width - doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor) / 2 : (align === 'right' ? width - doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor : 0));
      const textY = y + height / 2 + fontSize / 4;
      doc.text(text, textX, textY);
    }
  
    addTableCell(doc, `Nome do Funcionário: ${avaliacao.funcionario}`, 10, 35, 187, 10);
    addTableCell(doc, `Avaliado por: ${avaliacao.avaliador}`, 10, 45, 187, 10);
    addTableCell(doc, `Data da Avaliação: ${avaliacao.dataFormatada}`, 10, 55, 187, 10);
    addTableCell(doc, `Nota Individual: ${avaliacao.mediaIndividual}`, 10, 65, 187, 10);
    addTableCell(doc, `Nota do Time: ${avaliacao.mediaTime}`, 10, 75, 187, 10);
    addTableCell(doc, `Nota da Empresa: ${avaliacao.mediaEmpresa}`, 10, 85, 187, 10);
    addTableCell(doc, `Média Final: ${avaliacao.mediaFinalGeral}`, 10, 95, 187, 10);
  
    function addFormattedText(doc: jsPDF, text: string, x: number, y: number, fontSize: number) {
      const textLines = doc.splitTextToSize(text, 220);
      doc.setTextColor(0, 0, 0);
      doc.text(textLines, x, y);
    }

    // Legendas

        // Definir a posição da legenda
        const legendaX = 10; // Posição horizontal da legenda (ajuste conforme necessário)
        const legendaY = 115; // Posição vertical da legenda (ajuste conforme necessário)
      
        // Adicionar logo
        const legendaPath = '../../../assets/images/legendas.png';
        const legendaWidth = 189; // Largura do logo SVG no PDF
        const legendaHeight = 33; // Altura do logo SVG no PDF
        doc.addImage(legendaPath, 'PNG', legendaX, legendaY, legendaWidth, legendaHeight);

    // Critérios

    const formattedText = `
Critérios:

1. Para receber as bonificações* é necessário ter nota individual no mínimo de 9,0 em duas avaliações consecutivas e absenteísmo
"Muito Bom";

Notas:
 a) Se o colaborador obter nota maior ou igual a 9,0 e o absenteísmo for "Bom", receberá a bonificação da Performance Ouro;
 b) Caso o colaborador tenha nota maior ou igual a 9,0 porém o absenteísmo for "Regular" ou "Insatisfatório", não receberá as
 bonificações.
*As bonificações estão atreladas ao fluxo de caixa da empresa, ou seja, mesmo o funcionário tendo uma performance Ouro ou 
Diamante, só será bonificado mediante a aprovação do Financeiro.

2. Para ser promovido é necessário ter nota individual e média no mínimo de 9,0 em quatro avaliações consecutivas;

3. Peso = 5 - empresa/ 3 - individual/ 2 - time;

4. Se a empresa não atingiu o resultados, não segue com a promoção;

5. Promoção de 25% de colaboradores por time, se houver e programado com o Financeiro, considerando a seguinte ordem:
 a) Colaborador com maior nota;
 b) Em caso de empate na pontuação, o colaborador que tiver maior tempo de contratação (não considerando o tempo de estágio).

6. Definição de performance individual:
 a) Nota 0 até 6,99 = Prata
 b) Nota entre 7 e 8,99 = Ouro
 c) Nota igual ou maior que 9 = Diamante

7. Absenteísmo:
 a) Insatisfatório: Falta não programada e/ou falta não justificada. Obs.: Se o colaborador tiver banco de horas e não programar a 
 ausência, receberá esta avaliação;
 b) Regular: Dois atrasos ou mais na semana e/ou acima de um atestado no mês (equivalente até um dia);
 c) Bom: Um atraso e/ou um atestado no mês (equivalente até um dia);
 d) Muito bom: zero absenteísmo.`;

 let currentPage = 1;

 function addPageNumber() {
   doc.setTextColor(0, 0, 0);
   doc.setFontSize(10);
   doc.text(`Página ${currentPage} de 5`, doc.internal.pageSize.width - 33, doc.internal.pageSize.height - 10);
 }

 addPageNumber();

  doc.setFontSize(9); // Tamanho da fonte
  addFormattedText(doc, formattedText, 10, 155, 10);

  doc.addPage(); // Adiciona uma nova página
  currentPage++

  // doc.text('Lista de Notas', 10, 15);

  addTableCell(doc, `Itens:`, 10, 10, 100, 10, 'left', 3, [0, 187, 185])
  addTableCell(doc, `Requisitos:`, 110, 10, 30, 10, 'center', 0, [0, 187, 185])
  addTableCell(doc, `Avaliação:`, 140, 10, 30, 10, 'center', 0, [0, 187, 185])
  addTableCell(doc, `Nota:`, 170, 10, 30, 10, 'center', 0, [0, 187, 185])

  addPageNumber();
  
  let posY = 20;

  const itemsPerPage = 25; // Número de itens por página


avaliacao.notas.forEach((item: any, index: number) => {
  if (index % itemsPerPage === 0 && index !== 0) {
    // Adicionar nova página
    doc.addPage();
    addTableCell(doc, `Itens:`, 10, 10, 100, 10, 'left', 3, [0, 187, 185])
    addTableCell(doc, `Requisitos:`, 110, 10, 30, 10, 'center', 0, [0, 187, 185])
    addTableCell(doc, `Avaliação:`, 140, 10, 30, 10, 'center', 0, [0, 187, 185])
    addTableCell(doc, `Nota:`, 170, 10, 30, 10, 'center', 0, [0, 187, 185])
    posY = 20; // Reiniciar a posição para a nova página
    currentPage++;
    addPageNumber();
  }

  // Adicionar as células da tabela de notas
  addTableCell(doc, `${item.nome}`, 10, posY, 100, 10);
  addTableCell(doc, `${item.requisito}`, 110, posY, 30, 10, 'center', 0, [93, 233, 233]);
  addTableCell(doc, `${item.avaliacao}`, 140, posY, 30, 10, 'center', 0, [93, 233, 233]);
  addTableCell(doc, `${item.nota}`, 170, posY, 30, 10, 'center', 0);

  posY += 10; // Espaço entre as linhas
});


// Adicionar campos para as assinaturas na última página
const posYAssinaturas = posY + 15;
doc.text('____________________________________', 10, posYAssinaturas);
doc.text('____________________________________', 130, posYAssinaturas);
doc.text('Assinatura do Funcionário', 24, posYAssinaturas + 10);
doc.text('Assinatura do Avaliador', 148, posYAssinaturas + 10);

    // Gerar e baixar o PDF
    doc.save('relatorio.pdf');
  }

  
}