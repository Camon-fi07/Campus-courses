import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { GroupComponent } from './group.component';
import { GroupService } from './services/group.service';

@NgModule({
  declarations: [GroupComponent, GroupsListComponent, GroupCardComponent, ModalFormComponent],
  imports: [
    CommonModule,
    TuiButtonModule,
    RouterLink,
    ReactiveFormsModule,
    TuiLabelModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiDialogModule,
    TuiTextfieldControllerModule,
  ],
  exports: [GroupComponent],
  providers: [GroupService],
})
export class GroupModule {}
