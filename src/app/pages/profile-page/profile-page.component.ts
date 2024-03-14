import { Component } from '@angular/core';
import { ProfileModule } from 'modules/profile/profile.module';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {}
