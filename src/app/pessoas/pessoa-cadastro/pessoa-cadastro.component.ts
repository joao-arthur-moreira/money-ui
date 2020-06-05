import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PessoaService } from './../pessoa.service';
import { PessoaInput, Contato, Estado } from './../../core/model';

import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  categorias = [];
  pessoa = new PessoaInput();
  exbindoFormularioContato = false;
  contato: Contato;
  codigo: number;
  contatoIndex: number;
  estados = [];
  cidades = [];
  codigoEstado: number;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit() {
    this.codigo = this.route.snapshot.params.codigo;

    this.title.setTitle('Nova pessoa');

    if (this.codigo) {
      this.carregarPessoa(this.codigo);
    }
    this.carregarEstados();
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then(estados => {
        this.estados =  estados.map(e => ({ label: e.nome, value: e.codigo }));
        if (this.codigoEstado) {
          this.carregarCidades();
        }
      });
  }

  carregarCidades() {
    this.pessoaService.listarCidadesPorEstado(this.codigoEstado)
      .then(cidades => {
        this.cidades =  cidades.map(c => ({ label: c.nome, value: c.codigo }));
      });
  }

  prepararNovoContato() {
    this.exbindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exbindoFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(frm: FormControl) {
    this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);

    this.exbindoFormularioContato = false;

    frm.reset();
  }

  removerContato(index: number) {
    const contatoExcluir = this.pessoa.contatos[index];
    this.confirmationService.confirm({
      message: `Deseja excluir o contato: ${contatoExcluir.nome} ?`,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.pessoa.contatos.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Informação',
          detail: 'Contato excluído'
        });
      }
    });
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  salvar(form: FormControl) {
    if (this.codigo) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.messageService.add({
          severity: 'success',
          summary: 'Informação',
          detail: 'Pessoa cadastrada com sucesso!'
        });
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({
          severity: 'success',
          summary: 'Informação',
          detail: 'Pessoa alterada com sucesso!'
        });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.codigoEstado = this.pessoa.endereco.cidade.estado.codigo;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
