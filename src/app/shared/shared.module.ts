import { MessageComponent } from './message/message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/components/messages/messages';
import { MessageModule } from 'primeng/components/message/message';

@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,

    MessagesModule,
    MessageModule,
  ],
  exports: [MessageComponent]
})
export class SharedModule { }
