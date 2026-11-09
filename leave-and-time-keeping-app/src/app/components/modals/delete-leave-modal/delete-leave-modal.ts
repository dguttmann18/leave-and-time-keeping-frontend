import { Component, inject, input, output } from '@angular/core';
import { LeaveService } from '../../../services/leave.service';
import { LeaveApplication } from '../../../models/leave.model';
import { Modal } from '../../shared/modal/modal';

@Component({
  selector: 'app-delete-leave-modal',
  imports: [Modal],
  templateUrl: './delete-leave-modal.html',
  styleUrl: './delete-leave-modal.css',
})
export class DeleteLeaveModal {
  private leaveService = inject(LeaveService);

  data = input<LeaveApplication>();
  isOpen = input.required<boolean>();
  close = output<void>();

  closeModal() {
    this.close.emit();
  }

  deleteLeaveApplication() {
    const id = this.data()?.id;

    if (id) {
      this.leaveService.deleteLeaveApplication(id).subscribe({
        next: () => this.closeModal(),
        error: (err) => console.error('Failed to delete leave application', err),
      });
    }
  }
}
