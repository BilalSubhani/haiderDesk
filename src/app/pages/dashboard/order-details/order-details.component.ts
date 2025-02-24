import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  imports: [CommonModule],
})
export class OrderDetailsComponent {
  @Input() orderData: any;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<boolean>();

  close() {
    this.closeModal.emit(false);
  }
}
