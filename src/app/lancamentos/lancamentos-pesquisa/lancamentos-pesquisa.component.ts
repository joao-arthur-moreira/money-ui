import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';
import { Table } from 'primeng/components/table/table';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];
  total = 0;
  filtro = new LancamentoFiltro();
  @ViewChild('tabela', { static: true }) grid: Table;

  // angular 8 @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then((response) => {
        this.lancamentos = response.content;
        this.total = response.totalElements;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  /* pi-times-circle
  pi-check-circle */

  excluir(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este lançamento ?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.lancamentoService.excluir(lancamento.codigo)
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Informação',
              detail: 'Lançamento excluído'
            });
            // this.grid.first = 0;
            this.grid.reset();
          });
      }
    });
  }

}
