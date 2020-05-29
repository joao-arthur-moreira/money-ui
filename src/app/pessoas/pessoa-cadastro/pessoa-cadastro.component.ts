import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PessoaService } from './../pessoa.service';
import { PessoaInput } from './../../core/model';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  categorias = [];

  pessoa = new PessoaInput();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService
    ) { }

  ngOnInit() {

  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Informação',
          detail: 'Pessoa cadastrada com sucesso!'
        });
        form.reset();
        this.pessoa = new PessoaInput();
      });
  }



}
