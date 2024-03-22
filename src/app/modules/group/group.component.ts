import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UserService } from 'core/services/user/user.service';
import { Subject, take, takeUntil } from 'rxjs';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ModalFormContextData, OPERATION_TYPE } from './types/operationType';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit, OnDestroy {
  isAdmin = false;
  private unsubscribe = new Subject<void>();
  private readonly dialog = this.dialogs.open<ModalFormContextData<OPERATION_TYPE.ADD_GROUP>>(
    new PolymorpheusComponent(ModalFormComponent, this.injector),
    { data: { type: OPERATION_TYPE.ADD_GROUP } },
  );

  constructor(
    private userService: UserService,
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
  ) {}

  ngOnInit() {
    this.userService.userRoles.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.isAdmin = res?.isAdmin ?? false;
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  showDialog() {
    this.dialog.pipe(take(1)).subscribe();
  }
}
