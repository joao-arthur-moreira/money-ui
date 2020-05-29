import { PessoaInput } from './../core/model';
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

  pessoasURL = 'http://localhost:8080/pessoas';

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

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasURL)
      .toPromise();
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

  adicionar(pessoa: PessoaInput): Promise<void> {
    return this.http.post(this.pessoasURL, pessoa)
      .toPromise()
      .then(() => null);
  }

}
