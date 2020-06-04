import { CalendarModule } from 'primeng/components/calendar/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RelatorioLancamentosComponent],
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,
    ProgressSpinnerModule,

    RelatoriosRoutingModule,

    SharedModule
  ]
})
export class RelatoriosModule { }
