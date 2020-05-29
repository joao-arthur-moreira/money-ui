export class Pessoa {
  codigo: number;
}

export class Categoria {
  codigo: number;
}

export class PessoaInput {
  nome: string;
  status = true;
  cidade: string;
  estado: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
}

export class Lancamento {
  codigo: string;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  // observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
