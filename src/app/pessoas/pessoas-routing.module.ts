import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';


const routes: Routes = [
  { path: '', component: PessoasPesquisaComponent },
  { path: 'nova', component: PessoaCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule {}
