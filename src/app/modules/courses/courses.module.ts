import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { CoursesComponent } from './courses.component';

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, CoursesListItemComponent],
  imports: [CommonModule],
})
export class CoursesModule {}
