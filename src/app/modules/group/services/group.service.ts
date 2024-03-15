import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_PATHS } from 'shared/constants/apiPaths';
import { CreateCampusGroupModel, EditCampusGroupModel, GroupDto } from 'shared/types/groups';

@Injectable()
export class GroupService {
  private _groups = new BehaviorSubject<GroupDto[] | null>(null);

  constructor(private http: HttpClient) {
    this.getGroupsList().subscribe();
  }

  getGroupsList() {
    return this.http.get<GroupDto[]>(API_PATHS.GROUPS).pipe(
      tap((res) => {
        this._groups.next(res);
      }),
    );
  }

  addGroup(data: CreateCampusGroupModel) {
    return this.http.post(API_PATHS.GROUPS, data).pipe(
      tap(() => {
        this.getGroupsList().subscribe();
      }),
    );
  }

  editGroup(id: string, data: EditCampusGroupModel) {
    return this.http.put(API_PATHS.CONCRETE_GROUP(id), data).pipe(
      tap(() => {
        this.getGroupsList().subscribe();
      }),
    );
  }

  deleteGroup(id: string) {
    return this.http.delete(API_PATHS.CONCRETE_GROUP(id)).pipe(
      tap(() => {
        this.getGroupsList().subscribe();
      }),
    );
  }

  get groups() {
    return this._groups;
  }
}
