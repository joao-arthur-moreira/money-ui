import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { ToolbarModule } from 'primeng/components/toolbar/toolbar';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ToastModule } from 'primeng/components/toast/toast';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { PanelModule } from 'primeng/components/panel/panel';
import {TabViewModule} from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';

import { RouterModule } from '@angular/router';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({
  declarations: [PessoaCadastroComponent, PessoasPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    SharedModule,

    PessoasRoutingModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    ToolbarModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    ToastModule,
    ConfirmDialogModule,
    PanelModule,
    TabViewModule,
    DialogModule
  ],
  exports: []
})
export class PessoasModule { }
