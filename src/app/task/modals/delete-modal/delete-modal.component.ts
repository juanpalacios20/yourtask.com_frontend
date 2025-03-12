import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [NgIf],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  @Input() isVisible = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  confirmDelete() {
    this.confirm.emit();
  }
}
