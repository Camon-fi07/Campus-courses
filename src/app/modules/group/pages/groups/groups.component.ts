import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { APIGroupsService } from 'core/API/requests/apigroups.service';
import { UserStateService } from 'core/services/userState.service';
import { ModalFormComponent } from 'modules/group/components/modal-form/modal-form.component';
import { ModalFormContextData, OPERATION_TYPE } from 'modules/group/types/operationType';
import { Subject, finalize, take, takeUntil } from 'rxjs';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit, OnDestroy {
  isAdmin = false;
  groups!: GroupDto[] | null;
  isLoading = true;

  private unsubscribe = new Subject<void>();
  private readonly dialog = this.dialogs.open<ModalFormContextData<OPERATION_TYPE.ADD_GROUP>>(
    new PolymorpheusComponent(ModalFormComponent, this.injector),
    { data: { type: OPERATION_TYPE.ADD_GROUP } },
  );

  constructor(
    private userStateService: UserStateService,
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
    private readonly APIGroupsService: APIGroupsService,
  ) {}

  ngOnInit() {
    this.userStateService.userRoles.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.isAdmin = res?.isAdmin ?? false;
      },
    });
    this.fetchGroupsList();
  }

  fetchGroupsList() {
    this.isLoading = true;
    this.APIGroupsService.getGroupsList()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (res) => {
          this.groups = res;
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  handleCreateGroup() {
    this.dialog.pipe(take(1)).subscribe({ next: () => this.fetchGroupsList() });
  }
}
