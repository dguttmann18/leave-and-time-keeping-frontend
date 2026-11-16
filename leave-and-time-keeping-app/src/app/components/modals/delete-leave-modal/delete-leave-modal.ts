import { Component, inject, input, output } from '@angular/core';
import { LeaveService } from '../../../services/leave.service';
import { LeaveApplication } from '../../../models/leave.model';
import { Modal } from '../../shared/modal/modal';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-delete-leave-modal',
  imports: [Modal],
  templateUrl: './delete-leave-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class DeleteLeaveModal {
  private leaveService = inject(LeaveService);
  private notify = inject(NotificationService);

  data = input<LeaveApplication>();
  isOpen = input.required<boolean>();

  close = output<void>();
  deleted = output<void>();

  closeModal() {
    this.close.emit();
  }

  deleteLeaveApplication() {
    const id = this.data()?.id;
    if (!id) return;

    this.leaveService.deleteLeaveApplication(id).subscribe({
      next: () => {
        this.notify.success('Leave application cancelled');
        this.deleted.emit();
        this.closeModal();
      },
      error: (err) =>
        this.notify.httpError(err, 'Could not cancel the leave application. Please try again.'),
    });
  }
}
