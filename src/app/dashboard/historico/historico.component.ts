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

  downloadRelatorio() {
    // Cria uma instância do jsPDF
    const doc = new jsPDF();
  
    // Posição inicial para exibir as informações
    let y = 10;
  
    // Funcionário
    doc.setFontSize(15);
    doc.text('Funcionário: ' + this.nomeUsuario, 10, y);

    y += 10;

    // Avaliador
    doc.setFontSize(15);
    doc.text('Funcionário: ' + this.nomeUsuario, 10, y);
  
    y += 10;

    // Data
    doc.setFontSize(15);
    doc.text('Data da Avaliação: ' + this.nomeUsuario, 10, y);
  
    y += 10;
  
    // Notas
    doc.setFontSize(12);
    doc.text('Notas:', 10, y);
  
    y += 10;
  
    // Percorre o histórico de avaliações
    this.historicoAvaliacoes.forEach((avaliacao: any) => {
      avaliacao.notas.forEach((nota: any, index: number) => {
        // Verifica se há espaço suficiente na página atual para exibir a próxima linha
        if (y > doc.internal.pageSize.height - 10) {
          doc.addPage(); // Adiciona uma nova página
          y = 10; // Reseta a posição vertical
        }
        doc.setFontSize(10);
        doc.text(`${nota.nome}: ${nota.nota.toString()}`, 10, y);
        y += 10; // Incrementa a posição vertical para a próxima linha
      });
    });
  
    // Salve o documento PDF como um arquivo
    doc.save('relatorio-avaliacao.pdf');
  }
    
  
  
  
  
}
