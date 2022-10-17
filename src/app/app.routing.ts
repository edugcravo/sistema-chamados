import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaAdministrativaComponent } from './componentes/area-administrativa/area-administrativa.component';
import { ChamadoIndividualUserComponent } from './componentes/chamados/chamado-individual-user/chamado-individual-user.component';
import { ChamadoIndividualComponent } from './componentes/chamados/chamado-individual/chamado-individual.component';
import { ChamadosVisualizacaoUserComponent } from './componentes/chamados/chamados-visualizacao-user/chamados-visualizacao-user.component';
import { ChamadosComponent } from './componentes/chamados/chamados.component';
import { DashboardsComponent } from './componentes/dashboards/dashboards.component';
import { EquipeSuporteComponent } from './componentes/equipe-suporte/equipe-suporte.component';
import { GerarChamadoComponent } from './componentes/gerar-chamado/gerar-chamado.component';
import { InformacoesComponent } from './componentes/informacoes/informacoes.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuLateralComponent } from './componentes/menus/menu-lateral/menu-lateral.component';
import { MenuSuperiorComponent } from './componentes/menus/menu-superior/menu-superior.component';



const APP_ROUTES: Routes = [
  { path:'', redirectTo:'/login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'gerar-chamado', component: GerarChamadoComponent },
  { path: 'menu-lateral', component: MenuLateralComponent },
  { path: 'menu-superior', component: MenuSuperiorComponent },
  { path: 'dashboards', component: DashboardsComponent },
  { path: 'equipe-suporte', component: EquipeSuporteComponent },
  { path: 'informacoes', component: InformacoesComponent },
  { path: 'chamados', component: ChamadosComponent },
  { path: 'chamado-individual', component: ChamadoIndividualComponent },
  { path: 'chamado-individual-user', component: ChamadoIndividualUserComponent },
  { path: 'visualizacao-chamado', component: ChamadosVisualizacaoUserComponent },
  { path: 'area-administrativa', component: AreaAdministrativaComponent },


];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);/*Parametro é a constante declarada a cima */
