import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  // carregamento tardio de módulos (LazyLoad)
  { path: 'lancamentos', loadChildren: './lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: './pessoas/pessoas.module#PessoasModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'relatorios', loadChildren: './relatorios/relatorios.module#RelatoriosModule' },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-econtrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-econtrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
