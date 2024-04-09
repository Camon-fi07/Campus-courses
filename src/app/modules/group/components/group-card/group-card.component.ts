import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { APIGroupsService } from 'core/API/requests/apigroups.service';
import { UserStateService } from 'core/services/userState.service';
import { ModalFormContextData, OPERATION_TYPE } from 'modules/group/types/operationType';
import { Observable, Subject, finalize, take, takeUntil } from 'rxjs';
import { ModalFormComponent } from '../modal-form/modal-form.component';

@Component({
  selector: 'group-card',
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.scss',
})
export class GroupCardComponent implements OnInit, OnDestroy {
  @Input() group!: GroupDto;
  @Output() refetchGroups = new EventEmitter();
  isAdmin = false;
  isDeleteLoading = false;
  private unsubscribe = new Subject<void>();
  private dialog!: Observable<ModalFormContextData<OPERATION_TYPE.EDIT_GROUP>>;

  constructor(
    private userStateService: UserStateService,
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
    private readonly APIGroupsService: APIGroupsService,
  ) {}

  ngOnInit(): void {
    this.userStateService.userRoles.pipe(takeUntil(this.unsubscribe)).subscribe({
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
    this.APIGroupsService.deleteGroup(this.group.id)
      .pipe(
        finalize(() => {
          this.isDeleteLoading = false;
        }),
        take(1),
      )
      .subscribe({ next: () => this.refetchGroups.emit() });
  }

  handleEdit() {
    this.dialog.pipe(take(1)).subscribe({ next: () => this.refetchGroups.emit() });
  }
}
