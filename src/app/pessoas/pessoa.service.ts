import { environment } from './../../environments/environment';
import { PessoaInput, Estado, Cidade } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasURL =  `${environment.apiUrl}/pessoas`;
  estadosURL =  `${environment.apiUrl}/estados`;

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let url = this.pessoasURL;
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    url = url + '?resumo';

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(url, { params })
      .toPromise();
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(this.estadosURL)
      .toPromise()
      .then(estados => estados as Estado[]);
  }

  listarCidadesPorEstado(codigoEstado: number): Promise<Cidade[]> {
    return this.http.get(`${this.estadosURL}/${codigoEstado}/cidades`)
      .toPromise()
      .then(cidades => cidades as Cidade[]);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasURL)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<PessoaInput> {
    return this.http.get(`${this.pessoasURL}/${codigo}`)
      .toPromise()
      .then(response => response as PessoaInput);
  }

  excluir(codigo: string): Promise<void> {
    return this.http.delete(`${this.pessoasURL}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  ativarInativar(codigo: string, status: boolean): Promise<void> {
    const url = status ? `${this.pessoasURL}/${codigo}/ativar` : `${this.pessoasURL}/${codigo}/inativar`;
    return this.http.put(url, null)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: PessoaInput): Promise<PessoaInput> {
    return this.http.post(this.pessoasURL, pessoa)
      .toPromise()
      .then(response => response as PessoaInput);
  }

  atualizar(pessoa: PessoaInput): Promise<PessoaInput> {
    return this.http.put(`${this.pessoasURL}/${pessoa.codigo}`, pessoa)
      .toPromise()
      .then(response => response as PessoaInput);
  }

}
