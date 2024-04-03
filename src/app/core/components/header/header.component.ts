import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { ProfileService } from 'core/services/profile/profile.service';
import { UserService } from 'core/services/user/user.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { ROUTES } from 'shared/constants/routes';
import { UserProfile, UserRoles } from 'shared/types/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, RouterLink, TuiSvgModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth!: boolean;
  userRoles!: UserRoles | null;
  userProfile!: UserProfile | null;
  isOpen = false;
  isLogoutLoading = false;
  ROUTES = ROUTES;
  private unsubscribe = new Subject<void>();

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
    private profileService: ProfileService,
    private eRef: ElementRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.isAuth.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.isAuth = res;
      },
    });
    this.userService.userRoles.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.userRoles = res;
      },
    });
    this.userService.userProfile.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.userProfile = res;
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  handleLogout() {
    this.isLogoutLoading = true;
    this.profileService
      .logout()
      .pipe(
        finalize(() => {
          this.isLogoutLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.toggleIsOpen();
          this.router.navigate([ROUTES.LOGIN]);
        },
      });
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
