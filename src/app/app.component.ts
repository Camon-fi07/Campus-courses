import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';
import { HeaderComponent } from 'core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
