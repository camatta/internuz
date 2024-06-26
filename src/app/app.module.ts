import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { MenuLateralComponent } from './dashboard/menu-lateral/menu-lateral.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { AvaliacoesComponent } from './dashboard/avaliacoes/avaliacoes.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { HistoricoComponent } from './dashboard/historico/historico.component';
import { ComercialComponent } from './dashboard/comercial/comercial.component';
import { PiramideComponent } from './dashboard/piramide/piramide.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPrintModule } from 'ngx-print';
import { AutoavaliacaoComponent } from './dashboard/autoavaliacao/autoavaliacao.component';
import { DocsComponent } from './docs/docs.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPrintModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    CadastroComponent,
    DashboardComponent,
    LoginComponent,
    MenuLateralComponent,
    UsuariosComponent,
    AvaliacoesComponent,
    PerfilComponent,
    HistoricoComponent,
    ComercialComponent,
    PiramideComponent,
    RedefinirSenhaComponent,
    AutoavaliacaoComponent,
    DocsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
