import { Component, effect, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  isOpen = input.required<boolean>();
  title = input<string>('Modal Title');

  closeModal = output<void>();

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('modalElement');

  constructor() {
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.isOpen() && !el.open) {
        el.showModal();
      } else if (!this.isOpen() && el.open) {
        el.close();
      }
    });
  }

  onClose() {
    this.closeModal.emit();
  }
}
