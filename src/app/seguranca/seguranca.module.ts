import { MoneyHttpInterceptorService } from './money-http-interceptor.service';
import { ToastModule } from 'primeng/components/toast/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    ToastModule,

    JwtModule.forRoot({
      config: {
        tokenGetter, // função para pegar o token no localStorage
        whitelistedDomains: ['localhost:8080'], // URLs a interceptar e adicionar o token
        blacklistedRoutes: ['http://localhost:8080/oauth/token'] // URLs igonoradas
      }
    }),

    SegurancaRoutingModule
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptorService,
      multi: true
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
