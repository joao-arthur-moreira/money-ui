import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService } from './../lancamento.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from './../../pessoas/pessoa.service';

import { MessageService } from 'primeng/components/common/messageservice';

import * as moment from 'moment';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  br: any;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];

  lancamento = new Lancamento();
  codigo: string;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.br = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qua', 'Qui', 'Se', 'Sa'],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julio', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sem'
    };

    if (this.route.snapshot.params.codigo) {
      this.codigo = this.route.snapshot.params.codigo;
      this.buscarPorCodigo(this.codigo);
    }

    this.listarCategorias();
    this.listarPessoas();
  }

  buscarPorCodigo(codigo: string) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then((response) => {
        // converto as data que vem no formato string
        if (response.dataVencimento) {
          response.dataVencimento = moment(response.dataVencimento, 'YYYY-MM-DD').toDate();
        }

        if (response.dataPagamento) {
          response.dataPagamento = moment(response.dataPagamento, 'YYYY-MM-DD').toDate();
        }

        this.lancamento = response;
      });
  }

  listarCategorias() {
    this.categoriaService.listarTodas()
      .then(response => {
        this.categorias = response.map(c => ({ label:  c.nome, value: c.codigo}));
      });
  }

  listarPessoas() {
    this.pessoaService.listarTodas()
      .then(response => {
        this.pessoas = response.map(p => ({ label:  p.nome, value: p.codigo}));
      });
  }

  salvar(form: FormControl) {
    if (this.codigo) {
      this.atualizar();
    } else {
      this.adicionar(form);
    }
  }


  private adicionar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Informação',
          detail: 'Lançamento cadastrado com sucesso!'
        });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.codigo = response.codigo;
        this.router.navigate(['/lancamentos', this.codigo]);
      }).catch(erro => this.errorHandler.handle(erro));
  }

  private atualizar() {
    this.lancamentoService.atualizar(this.lancamento)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Informação',
          detail: 'Lançamento atualizado com sucesso!'
        });
        // form.reset();
        // this.lancamento = new Lancamento();
      }).catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.codigo = undefined;
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

}
