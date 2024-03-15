import { Component } from '@angular/core';
import { GroupService } from 'modules/group/services/group.service';
import { GroupDto } from 'shared/types/groups';

@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
})
export class GroupsListComponent {
  groups?: GroupDto[];

  constructor(private groupService: GroupService) {
    groupService.getGroupsList().subscribe({
      next: (res) => {
        this.groups = res;
      },
    });
  }
}
