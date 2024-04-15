import { Component, EventEmitter, Output } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'confirmation-delete',
  standalone: true,
  imports: [TuiButtonModule],
  templateUrl: './confirmation-delete.component.html',
  styleUrl: './confirmation-delete.component.scss',
})
export class ConfirmationDeleteComponent {
  @Output() cancelEmit = new EventEmitter();
  @Output() confirmEmit = new EventEmitter();
  isLoading = false;

  handleConfirm() {
    this.isLoading = true;
    this.confirmEmit.emit();
  }
}
