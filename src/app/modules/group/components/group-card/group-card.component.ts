import { Component, Input, ViewEncapsulation } from '@angular/core';
import { UserService } from 'core/services/user/user.service';
import { GroupDto } from 'shared/types/groups';

@Component({
  selector: 'group-card',
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GroupCardComponent {
  @Input() group!: GroupDto;
  isAdmin = false;

  constructor(private userService: UserService) {
    userService.userRoles.subscribe({
      next: (res) => {
        this.isAdmin = res?.isAdmin ?? false;
      },
    });
  }
}
