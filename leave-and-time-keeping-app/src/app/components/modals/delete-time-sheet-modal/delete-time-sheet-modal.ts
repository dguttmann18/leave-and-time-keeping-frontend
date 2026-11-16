import { Component, inject, input, output } from '@angular/core';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { TimeSheetEntry } from '../../../models/time-sheet.model';
import { Modal } from '../../shared/modal/modal';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-delete-time-sheet-modal',
  imports: [Modal],
  templateUrl: './delete-time-sheet-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class DeleteTimeSheetModal {
  private timeSheetService = inject(TimeSheetService);
  private notify = inject(NotificationService);

  data = input<TimeSheetEntry>();
  isOpen = input.required<boolean>();

  close = output<void>();
  deleted = output<void>();

  closeModal() {
    this.close.emit();
  }

  deleteTimeSheetEntry() {
    const id = this.data()?.id;
    if (!id) return;

    this.timeSheetService.deleteTimeSheetEntry(id).subscribe({
      next: () => {
        this.notify.success('Time sheet entry deleted');
        this.deleted.emit();
        this.closeModal();
      },
      error: (err) =>
        this.notify.httpError(err, 'Could not delete the time sheet entry. Please try again.'),
    });
  }
}
