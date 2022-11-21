import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { DashboardsComponent } from './componentes/dashboards/dashboards.component';
import { EquipeSuporteComponent } from './componentes/equipe-suporte/equipe-suporte.component';
import { GerarChamadoComponent } from './componentes/gerar-chamado/gerar-chamado.component';
import { InformacoesComponent } from './componentes/informacoes/informacoes.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChamadosComponent } from './componentes/chamados/chamados.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ChamadoIndividualComponent } from './componentes/chamados/chamado-individual/chamado-individual.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MenuSuperiorComponent } from './componentes/menus/menu-superior/menu-superior.component';
import { MenuLateralComponent } from './componentes/menus/menu-lateral/menu-lateral.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ChamadosVisualizacaoUserComponent } from './componentes/chamados/chamados-visualizacao-user/chamados-visualizacao-user.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AreaAdministrativaComponent } from './componentes/area-administrativa/area-administrativa.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ChamadoIndividualUserComponent } from './componentes/chamados/chamado-individual-user/chamado-individual-user.component';
import { UsuariosComponent } from './componentes/area-administrativa/usuarios/usuarios.component';
import { NovoUsuarioComponent } from './componentes/area-administrativa/usuarios/novo-usuario/novo-usuario.component';
import { TecnicosComponent } from './componentes/area-administrativa/tecnicos/tecnicos.component';
import { NovoTecnicoComponent } from './componentes/area-administrativa/tecnicos/novo-tecnico/novo-tecnico.component';
import { NgxChartModule } from 'ngx-chart';
import { LogsComponent } from './componentes/area-administrativa/logs/logs.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ResumoComponent } from './componentes/area-administrativa/resumo/resumo.component';
import { RelatorioComponent } from './componentes/chamados/relatorio/relatorio.component';


@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    GerarChamadoComponent,
    MenuLateralComponent,
    InformacoesComponent,
    DashboardsComponent,
    EquipeSuporteComponent,
    ChamadosComponent,
    ChamadoIndividualComponent,
    MenuSuperiorComponent,
    ChamadosVisualizacaoUserComponent,
    AreaAdministrativaComponent,
    ChamadoIndividualUserComponent,
    UsuariosComponent,
    NovoUsuarioComponent,
    TecnicosComponent,
    NovoTecnicoComponent,
    LogsComponent,
    ResumoComponent,
    RelatorioComponent
   ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    SweetAlert2Module . forRoot ( ),
    MatMenuModule,
    MatIconModule,
    NzCarouselModule,
    NzSelectModule,
    NzTableModule,
    MatSnackBarModule,
    NgxChartModule,
    NzUploadModule,
    NzModalModule,
    NzIconModule,
    NzAvatarModule,
    NzSpinModule,
    MatSelectModule,
    MatFormFieldModule
    
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
