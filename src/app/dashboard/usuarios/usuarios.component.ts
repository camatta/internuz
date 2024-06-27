import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: any[] = []; // Array de Usuários
  usersAtivos: any[] = []; // Array de usuários ativos
  usersInativos: any[] = []; // Array de usuários inativos
  sortedUsersAtivos: any[] = []; // Array de usuários ativos ordenados
  sortedUsersInativos: any[] = []; // Array de usuários inativos ordenados
  editedUser: any = {}; // Objeto que vai armazenar os dados do usuário editado
  sectorOptions: any[] = [];
  selectedTab: 'ativos' | 'inativos' = 'ativos'; // Aba selecionada
  sortField: string = ''; // Campo de ordenação
  sortDirection: 'asc' | 'desc' = 'asc'; // Direção de ordenação

  constructor(private userService: UserService, private router: Router) {}

  updateSectorOptions() {
    if (this.editedUser.team === 'Tecnologia') {
        this.sectorOptions = ['Desenvolvimento', 'Design UI/UX', 'CS Tecnologia', 'Head'];
    } else if (this.editedUser.team === 'Marketing') {
        this.sectorOptions = ['Redação', 'Design Publicitário', 'Mídias Pagas', 'Inbound Marketing', 'SEO', 'Head']; 
    } else if (this.editedUser.team === 'Customer Success') {
      this.sectorOptions = ['CS', 'Head']; 
    } else if (this.editedUser.team === 'Comercial') {
      this.sectorOptions = ['Vendas', 'Pré-Vendas', 'Head']; 
    } else if (this.editedUser.team === 'Administrativo') {
      this.sectorOptions = ['RH', 'Financeiro', 'Head']; 
    }
}

  // Função para abrir o modal e definir o usuário a ser editado
  openEditUserModal(user: any) {
    // Define o usuário a ser editado
    this.editedUser = { ...user };
    this.updateSectorOptions();

    // Converte o status para booleano
    this.editedUser.status = user.status === 'Ativo';
    
    // Abre o modal
    const modal = document.getElementById('editUserModal');
    if (modal) {
      modal.classList.add('show');
    }
  }

  // Função para fechar o modal
  closeEditUserModal() {
    const modal = document.getElementById('editUserModal');
    if (modal) {
      modal.classList.remove('show');
    }
    // this.editedUser = {}; // Limpa os detalhes do usuário
  }



  // Função para salvar as alterações do usuário
  salvarEdicaoUsuario() {

    this.closeEditUserModal();

    // Converte o status para string antes de salvar
    this.editedUser.status = this.editedUser.status ? 'Ativo' : 'Inativo';

    this.userService.updateUser(this.editedUser).subscribe(
      (response) => {
        console.log('Usuário atualizado com sucesso:', response);
        alertifyjs.success('Usuário atualizado com sucesso.'); 
        this.updateUserInList(response);
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
        alertifyjs.error('Erro ao atualizar usuário.'); 
      }
    );
  }

  // Método para atualizar os dados do usuário na lista de usuários
updateUserInList(updatedUser: any) {
  const index = this.users.findIndex(user => user._id === updatedUser._id);
  if (index !== -1) {
    this.users[index] = updatedUser;
  }

  // Atualiza arrays de usuários ativos e inativos
  this.updateUsersStatusArrays();
}

  // Atualiza arrays de usuários ativos e inativos
  updateUsersStatusArrays() {
    this.usersAtivos = this.users.filter(user => user.status === 'Ativo');
    this.usersInativos = this.users.filter(user => user.status === 'Inativo');

    this.sortedUsersAtivos = [...this.usersAtivos];
    this.sortedUsersInativos = [...this.usersInativos];
  }
  
  // Seleciona a aba de usuários ativos ou inativos
  selectTab(tab: 'ativos' | 'inativos') {
    this.selectedTab = tab;
  }

  // Método para ordenar os usuários
  sortUsers(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    const compare = (a: any, b: any) => {
      if (a[field] === undefined || b[field] === undefined) return 0;
      return a[field].localeCompare(b[field], undefined, { sensitivity: 'base' }) * (this.sortDirection === 'asc' ? 1 : -1);
    };

    if (this.selectedTab === 'ativos') {
      this.sortedUsersAtivos.sort(compare);
    } else {
      this.sortedUsersInativos.sort(compare);
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.updateUsersStatusArrays(); // Inicializa os arrays de usuários ativos e inativos
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
