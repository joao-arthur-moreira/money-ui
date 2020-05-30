import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-econtrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-econtrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
