import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { UserService } from 'core/services/user.service';
import { MY_COURSES, TEACHING_COURSES } from 'shared/constants/apiPaths';
import { CourseModel } from 'shared/types/courses';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TuiButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuth!: boolean;
  isStudent = false;
  isTeacher = false;

  constructor(
    private userService: UserService,
    private http: HttpClient,
  ) {
    this.userService.getIsAuth.subscribe({
      next: (res) => {
        this.isAuth = res;
      },
    });
    const headers = { Authorization: `Bearer ${userService.getToken}` };

    this.http.get<CourseModel[]>(MY_COURSES, { headers: headers }).subscribe({
      next: (res) => {
        this.isStudent = res.length > 0;
      },
    });

    this.http.get<CourseModel[]>(TEACHING_COURSES, { headers: headers }).subscribe({
      next: (res) => {
        this.isTeacher = res.length > 0;
      },
    });
  }
}
