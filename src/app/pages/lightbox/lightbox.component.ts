import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css'],
  imports: [CommonModule],
})
export class LightboxComponent {
  @Input() imageSrc: string = '';
  @Input() isOpen: boolean = false;
  @Output() lightBoxEvent = new EventEmitter<boolean>();

  closeLightbox() {
    this.isOpen = false;
    this.lightBoxEvent.emit(false);
  }
}
