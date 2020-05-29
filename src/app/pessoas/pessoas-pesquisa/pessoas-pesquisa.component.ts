import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { Table } from 'primeng/components/table/table';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [];
  filtro = new PessoaFiltro();
  @ViewChild('tabela') grid: Table;
  total = 0;

  /* pessoas = [
    { nome: 'João Arthur', cidade: 'Beberibe', estado: 'CE', status: true },
    { nome: 'João Levy', cidade: 'Fortaleza', estado: 'CE', status: false },
    { nome: 'Maria Sophia', cidade: 'Fortaleza', estado: 'CE', status: true }
  ]; */

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit() {
  }

  /* pesquisar() {
    this.pessoaService.pesquisar(this.filtro)
      .then(response => {
        this.pessoas = response;
      })
      .catch(error => this.errorHandlerService.handle(error));
  } */

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then((response) => {
        this.pessoas = response.content;
        this.total = response.totalElements;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta pessoa ?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.pessoaService.excluir(pessoa.codigo)
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Informação',
              detail: 'Pessoa excluída'
            });
            // this.grid.first = 0; angular 7
            // this.grid.reset(); // angular 8 quando estive usando paginação com lazyload
            this.pesquisar();
          })
          .catch(error => this.errorHandlerService.handle(error));
      }
    });
  }

  alternarStatus(pessoa: any) {
    const mensagem = pessoa.status ? 'Pessoa inativada com sucesso' : 'Pessoa ativada com sucesso';
    this.pessoaService.ativarInativar(pessoa.codigo, !pessoa.status)
      .then(() => {
        pessoa.status = !pessoa.status;

        this.messageService.add({
          severity: 'success',
          summary: 'Informação',
          detail: mensagem
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

}
