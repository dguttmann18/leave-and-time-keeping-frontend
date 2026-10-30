import { Component, inject, input, output } from '@angular/core';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { Project, TimeSheetEntry } from '../../../models/time-sheet.model';
import { Modal } from '../../shared/modal/modal';

@Component({
  selector: 'app-delete-time-sheet-modal',
  imports: [Modal],
  templateUrl: './delete-time-sheet-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class DeleteTimeSheetModal {
  private timeSheetService = inject(TimeSheetService);

  data = input<TimeSheetEntry>();
  isOpen = input.required<boolean>();
  close = output<void>();

  closeModal() {
    this.close.emit();
  }

  deleteTimeSheetEntry() {
    const id = this.data()?.id;

    if (id) {
      this.timeSheetService.deleteTimeSheetEntry(id).subscribe({
        next: () => this.closeModal(),
        error: (err) => console.error('Failed to delete time sheet entry', err),
      });
    }
  }
}
