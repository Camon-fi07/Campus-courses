import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { UserService } from 'core/services/user.service';
import { UserProfile, UserRoles } from 'shared/types/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuth!: boolean;
  userRoles!: UserRoles;
  userProfile?: UserProfile | null;

  constructor(private userService: UserService) {
    this.userService.getIsAuth.subscribe({
      next: (res) => {
        this.isAuth = res;
      },
    });
    this.userService.getUserRoles.subscribe({
      next: (res) => {
        this.userRoles = res;
      },
    });
    this.userService.getUserProfile.subscribe({
      next: (res) => {
        this.userProfile = res;
      },
    });
  }
}
