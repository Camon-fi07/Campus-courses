import { Component, Injector, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UserService } from 'core/services/user/user.service';
import { GroupService } from 'modules/group/services/group.service';
import { ModalFormContextData, OPERATION_TYPE } from 'modules/group/types/operationType';
import { Observable, Subject, finalize, take, takeUntil } from 'rxjs';
import { GroupDto } from 'shared/types/groups';
import { ModalFormComponent } from '../modal-form/modal-form.component';

@Component({
  selector: 'group-card',
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GroupCardComponent implements OnInit, OnDestroy {
  @Input() group!: GroupDto;
  isAdmin = false;
  isDeleteLoading = false;
  private unsubscribe = new Subject<void>();
  private dialog!: Observable<ModalFormContextData<OPERATION_TYPE.EDIT_GROUP>>;

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private alerts: TuiAlertService,
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
  ) {}

  ngOnInit(): void {
    this.userService.userRoles.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.isAdmin = res?.isAdmin ?? false;
      },
    });

    this.dialog = this.dialogs.open<ModalFormContextData<OPERATION_TYPE.EDIT_GROUP>>(
      new PolymorpheusComponent(ModalFormComponent, this.injector),
      {
        data: { type: OPERATION_TYPE.EDIT_GROUP, id: this.group.id, defaultName: this.group.name },
      },
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  handleDelete() {
    this.isDeleteLoading = true;
    this.groupService
      .deleteGroup(this.group.id)
      .pipe(
        finalize(() => {
          this.isDeleteLoading = false;
        }),
        take(1),
      )
      .subscribe({
        error: (e) => {
          this.alerts.open(e.message, { label: 'Произошла ошибка', status: 'error' }).subscribe();
        },
      });
  }

  handleEdit() {
    this.dialog.pipe(take(1)).subscribe();
  }
}
