import { Component } from '@angular/core';
import { UserService } from 'core/services/user/user.service';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent {
  isAdmin = false;

  constructor(private userService: UserService) {
    userService.userRoles.subscribe({
      next: (res) => {
        this.isAdmin = res?.isAdmin ?? false;
      },
    });
  }
}
