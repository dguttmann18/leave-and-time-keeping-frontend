import { Component, input, output } from '@angular/core';
import { Modal } from '../../shared/modal/modal';
import { TimeSheetEntry } from '../../../models/time-sheet.model';
import { FormsModule } from '@angular/forms';
import { projects } from '../../../data/time-sheet.data';

@Component({
  selector: 'app-time-sheet-modal',
  imports: [Modal, FormsModule],
  templateUrl: './time-sheet-modal.html',
  styleUrl: './time-sheet-modal.css',
})
export class TimeSheetModal {
  data = input<TimeSheetEntry>();
  isOpen = input.required<boolean>();
  close = output<void>();

  protected readonly projects = projects;
  protected readonly Date = Date;

  closeModal() {
    this.close.emit();
  }

  // openModal() {
  //   this.isOpen = true;
  // }
  //
  // closeModal() {
  //   this.isOpen.(false);
  // }
}
