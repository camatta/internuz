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
  exibirDetalhes = false;

  constructor(private avaliacoesService: AvaliacoesService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.checkAuthorization();
    this.getUsers();
    this.getHistoricoAvaliacoes();
  }

  checkAuthorization(): void {
    const accessLevel = this.authService.getAccessLevel(); // Método para obter o nível de acesso do usuário
    if (accessLevel === 'Administrador' || accessLevel === 'Líder de Equipe') {
      this.isAuthorized = true;
    }
  }

  getUsers(): void {
    if (this.isAuthorized) {
      this.userService.getUsers().subscribe(
        (users: any[]) => {
          this.users = users;
          console.log(this.users);
        },
        (error: any) => {
          console.error('Erro ao obter lista de usuários', error);
        }
      );
    }
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
    // Crie uma nova instância do jsPDF
    const doc = new jsPDF();
  

    // Definir o tamanho da fonte menor para o conteúdo
    const fontSizeMenor = 12;

    // Adicionar o conteúdo ao PDF
    doc.setFontSize(fontSizeMenor);
    doc.text(`Nome do Funcionário: ${avaliacao.funcionario}`, 10, 10);
    doc.text(`Avaliado por: ${avaliacao.avaliador}`, 10, 20);
    doc.text(`Data da Avaliação: ${avaliacao.dataFormatada}`, 10, 30);
    doc.text(`Nota Individual: ${avaliacao.mediaIndividual}`, 10, 40);
    doc.text(`Nota do Time: ${avaliacao.mediaTime}`, 10, 50);
    doc.text(`Nota da Empresa: ${avaliacao.mediaEmpresa}`, 10, 60);
    doc.text(`Média Final: ${avaliacao.mediaFinalGeral}`, 10, 70);
    
    // Verificar se há espaço suficiente na página atual
    const availableSpace = doc.internal.pageSize.height - 70; // Espaço disponível após a adição dos primeiros elementos
  
    // Definir a altura máxima para a lista de notas
    const maxListHeight = availableSpace - 40; // 40 é a altura estimada dos outros elementos
  
    // Verificar se há espaço suficiente para a lista de notas
    if (maxListHeight > 0) {
      // Continuar adicionando o conteúdo
      doc.setFontSize(10);
  
      // Lista de Notas
      let posY = 90; // Posição inicial para a lista de notas
      const itemsPerPage = Math.floor(maxListHeight / 10); // Quantidade máxima de itens por página
  
      avaliacao.notas.forEach((item: any, index: number) => {
        if (index % itemsPerPage === 0 && index !== 0) {
          // Adicionar nova página
          doc.addPage();
          posY = 10; // Reiniciar a posição para a nova página
        }
        doc.text(`${item.nome}: ${item.nota}`, 10, posY);
        posY += 10;
      });
  
      // Adicionar campos para as assinaturas
      const posYAssinaturas = posY + 20;
      doc.text('Assinatura do Funcionário:', 10, posYAssinaturas);
      doc.text('Assinatura do Avaliador:', 100, posYAssinaturas);
    }
  
    // Gerar e baixar o PDF
    doc.save('relatorio.pdf');

  }
  
}
