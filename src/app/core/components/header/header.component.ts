import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiAlertService, TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { UserService } from 'core/services/user.service';
import { UserProfile, UserRoles } from 'shared/types/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, RouterLink, TuiSvgModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuth!: boolean;
  userRoles?: UserRoles | null;
  userProfile?: UserProfile | null;
  isOpen = false;
  isLogoutLoading = false;

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isOpen = false;
  }

  constructor(
    private userService: UserService,
    private alerts: TuiAlertService,
    private eRef: ElementRef,
  ) {
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

  handleLogout() {
    this.isLogoutLoading = true;
    this.userService.logout().subscribe({
      next: () => {
        this.toggleIsOpen();
        this.isLogoutLoading = false;
      },
      error: (e) => {
        this.alerts.open(e.message, { label: 'Произошла ошибка', status: 'error' }).subscribe();
        this.isLogoutLoading = false;
      },
    });
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
