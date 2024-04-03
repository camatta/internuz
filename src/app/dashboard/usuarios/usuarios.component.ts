import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: any[] = []; // Array de Usuários
  editedUser: any = {}; // Objeto que vai armazenar os dados do usuário editado
  sectorOptions: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  updateSectorOptions() {
    if (this.editedUser.team === 'Tecnologia') {
        this.sectorOptions = ['Desenvolvimento', 'Design UI/UX', 'CS Tecnologia', 'Head'];
    } else if (this.editedUser.team === 'Marketing') {
        this.sectorOptions = ['Redação', 'Design Publicitário', 'Tráfego Pago', 'Inbound Marketing', 'SEO', 'Head']; 
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
    this.editedUser = {}; // Limpa os detalhes do usuário
  }

  // Função para salvar as alterações do usuário
  salvarEdicaoUsuario() {
    this.userService.updateUser(this.editedUser).subscribe(
      (response) => {
        console.log('Usuário atualizado com sucesso:', response);
        this.closeEditUserModal();
        this.updateUserInList(response);
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
      }
    );
  }

  // Método para atualizar os dados do usuário na lista de usuários
updateUserInList(updatedUser: any) {
  const index = this.users.findIndex(user => user._id === updatedUser._id);
  if (index !== -1) {
    this.users[index] = updatedUser;
  }
}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
