import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupComponent } from './group.component';
import { GroupService } from './services/group.service';

@NgModule({
  declarations: [GroupComponent, GroupsListComponent, GroupCardComponent],
  imports: [CommonModule, TuiButtonModule, RouterLink],
  exports: [GroupComponent],
  providers: [GroupService],
})
export class GroupModule {}
