import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { AvaliacoesComponent } from './dashboard/avaliacoes/avaliacoes.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { HistoricoComponent } from './dashboard/historico/historico.component';
import { ComercialComponent } from './dashboard/comercial/comercial.component';
import { AuthGuard } from './routes/auth.guard';
import { PiramideComponent } from './dashboard/piramide/piramide.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'avaliacoes', component: AvaliacoesComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'historico', component: HistoricoComponent },
    { path: 'comercial', component: ComercialComponent },
    { path: 'piramide', component: PiramideComponent },
  ]},
  { path: 'cadastro', component: CadastroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
