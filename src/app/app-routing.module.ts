import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { AvaliacoesComponent } from './dashboard/avaliacoes/avaliacoes.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'avaliacoes', component: AvaliacoesComponent }
  ]},
  { path: 'cadastro', component: CadastroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
