import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { APIGroupsService } from 'core/API/requests/apigroups.service';
import { ModalFormContextData, OPERATION_TYPE } from 'modules/group/types/operationType';
import { take } from 'rxjs';

@Component({
  selector: 'modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss',
})
export class ModalFormComponent {
  formGroup!: FormGroup;
  isLoading = false;
  title = '';

  constructor(
    private fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, ModalFormContextData>,
    private APIGroupsService: APIGroupsService,
  ) {
    const defaultName = context.data.type === OPERATION_TYPE.EDIT_GROUP ? context.data.defaultName : null;
    this.formGroup = fb.group({ name: new FormControl(defaultName, Validators.required) });
    this.title = context.data.type === OPERATION_TYPE.ADD_GROUP ? 'Добавить группу' : 'Редактировать группу';
  }

  handleSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const data = this.context.data;
      this.isLoading = true;
      if (data.type === OPERATION_TYPE.ADD_GROUP) {
        this.APIGroupsService.addGroup(this.formGroup.value)
          .pipe(take(1))
          .subscribe({
            next: () => this.context.completeWith(),
            error: () => {
              this.isLoading = false;
            },
          });
      } else {
        this.APIGroupsService.editGroup(data.id, this.formGroup.value)
          .pipe(take(1))
          .subscribe({
            next: () => this.context.completeWith(),
            error: () => {
              this.isLoading = false;
            },
          });
      }
    }
  }
}
