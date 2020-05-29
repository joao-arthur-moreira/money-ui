import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;
    let statusCode = 0;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
      statusCode = errorResponse.status;

      msg = 'Ocorreu um erro ao processar sua solicitação, verifique os dados informado.';
      if (errorResponse.status === 404) {
        msg = 'O recurso solicitado não foi encontrado no servidor.';
      } else if (errorResponse.status === 401) {
        msg = 'Ocorreu um erro de autenticação, verifique os dados de login!';
      }
      // código de referência caso a API implemente uma respota de erro customizada
      /* try {
        errors = errorResponse.json();

        msg = errors[0].mensagemUsuario;
      } catch (e) { } */

      console.error('Ocorreu um erro', errorResponse);
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 500 && errorResponse.status <= 599) {
      statusCode = errorResponse.status;

      msg = 'Ocorreu um erro interno no servidor.';
      console.log('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    let tipoErro = 'error';
    let summary = 'Erro';
    if (statusCode > 0 && statusCode <= 499) {
      tipoErro = 'warn';
      summary = 'Atenção!';
    }

    this.messageService.add({
      severity: tipoErro,
      summary,
      detail: msg,
    });
  }

}
