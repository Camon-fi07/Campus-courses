import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupService } from 'modules/group/services/group.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
})
export class GroupsListComponent implements OnInit, OnDestroy {
  groups!: GroupDto[] | null;
  private unsubscribe = new Subject<void>();

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupService.groups.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.groups = res;
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
