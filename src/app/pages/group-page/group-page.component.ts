import { Component } from '@angular/core';
import { GroupModule } from 'modules/group/group.module';

@Component({
  selector: 'app-group-page',
  standalone: true,
  imports: [GroupModule],
  templateUrl: './group-page.component.html',
  styleUrl: './group-page.component.scss',
})
export class GroupPageComponent {}
