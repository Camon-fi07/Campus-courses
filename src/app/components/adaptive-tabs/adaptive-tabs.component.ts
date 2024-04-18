import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiSelectModule, TuiTabsModule } from '@taiga-ui/kit';
import { TabsVariants } from './adaptive-tabs.types';

@Component({
  selector: 'adaptive-tabs',
  standalone: true,
  imports: [CommonModule, FormsModule, TuiTabsModule, TuiSelectModule, TuiTextfieldControllerModule, TuiDataListModule],
  templateUrl: './adaptive-tabs.component.html',
  styleUrl: './adaptive-tabs.component.scss',
})
export class AdaptiveTabsComponent implements OnInit {
  @Input({ required: true }) valueIndex!: number;
  @Output() valueIndexChange = new EventEmitter<number>();
  @Input({ required: true }) tabsVariants!: TabsVariants[];

  newValueIndex = 0;

  ngOnInit(): void {
    this.newValueIndex = this.valueIndex;
  }

  handleChange(index: number) {
    this.valueIndex = index;
    this.valueIndexChange.emit(index);
  }
}
