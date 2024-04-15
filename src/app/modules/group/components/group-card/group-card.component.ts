import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent, PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { APIGroupsService } from 'core/API/requests/apigroups.service';
import { UserStateService } from 'core/services/userState.service';
import { ModalFormContextData, OPERATION_TYPE } from 'modules/group/types/operationType';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import { ROUTES } from 'shared/constants/routes';
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
  private unsubscribe = new Subject<void>();
  private dialog!: Observable<ModalFormContextData<OPERATION_TYPE.EDIT_GROUP>>;
  ROUTES = ROUTES;
  deleteGroupSubscription?: Subscription;

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

  handleEdit() {
    this.dialog.pipe(take(1)).subscribe({ next: () => this.refetchGroups.emit() });
  }

  handleOpenDeleteConfirmation(content: PolymorpheusContent<TuiDialogContext>) {
    this.deleteGroupSubscription = this.dialogs.open(content).pipe(take(1)).subscribe();
  }

  handleDeleteGroup() {
    console.log('what');
    this.APIGroupsService.deleteGroup(this.group.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.refetchGroups.emit();
          this.deleteGroupSubscription?.unsubscribe();
        },
      });
  }
}
