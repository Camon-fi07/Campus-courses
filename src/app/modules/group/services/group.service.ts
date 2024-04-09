import { Injectable } from '@angular/core';
import { APIGroupsService } from 'core/API/requests/apigroups.service';
import { BehaviorSubject, take, tap } from 'rxjs';

@Injectable()
export class GroupService {
  private _groups = new BehaviorSubject<GroupDto[] | null>(null);

  constructor(private APIGroupsService: APIGroupsService) {
    this.getGroupsList().subscribe();
  }

  getGroupsList() {
    return this.APIGroupsService.getGroupsList().pipe(
      take(1),
      tap((res) => {
        this._groups.next(res);
      }),
    );
  }

  addGroup(data: CreateCampusGroupModel) {
    return this.APIGroupsService.addGroup(data).pipe(
      tap(() => {
        this.getGroupsList().subscribe();
      }),
    );
  }

  editGroup(id: string, data: EditCampusGroupModel) {
    return this.APIGroupsService.editGroup(id, data).pipe(
      tap(() => {
        this.getGroupsList().subscribe();
      }),
    );
  }

  deleteGroup(id: string) {
    return this.APIGroupsService.deleteGroup(id).pipe(
      tap(() => {
        this.getGroupsList().subscribe();
      }),
    );
  }

  get groups() {
    return this._groups;
  }
}
