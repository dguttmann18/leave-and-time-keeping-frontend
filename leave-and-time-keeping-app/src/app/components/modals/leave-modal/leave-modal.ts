import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Modal } from '../../shared/modal/modal';
import { LeaveService } from '../../../services/leave.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LeaveApplication, LeaveApplicationRequest } from '../../../models/leave.model';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-leave-modal',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './leave-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class LeaveModal {
  private leaveService = inject(LeaveService);
  private notify = inject(NotificationService);

  saving = signal(false);
  leaveForm: FormGroup = this.setupLeaveForm();

  data = input<LeaveApplication>();
  isOpen = input.required<boolean>();

  close = output<void>();
  saved = output<void>();

  constructor() {
    effect(() => {
      const leaveForm = this.data();
      if (leaveForm) {
        this.leaveForm.patchValue({
          firstDay: leaveForm.firstDay,
          lastDay: leaveForm.lastDay,
          isPartial: leaveForm.isPartial,
          hours: leaveForm.hours,
          leaveType: leaveForm.leaveType,
          description: leaveForm.description,
        });
      } else {
        this.leaveForm.reset();
      }
    });
  }

  setupLeaveForm() {
    return new FormGroup({
      firstDay: new FormControl<string | null>(null),
      lastDay: new FormControl<string | null>(null),
      isPartial: new FormControl<boolean>(false, { nonNullable: true }),
      hours: new FormControl<number | null>(null),
      leaveType: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
    });
  }

  formToDto(): LeaveApplicationRequest {
    const { firstDay, lastDay, isPartial, hours, leaveType, description } = this.leaveForm.value;

    return {
      firstDay: firstDay ?? undefined,
      lastDay: lastDay ?? undefined,
      isPartial: isPartial ?? undefined,
      hours: hours ?? undefined,
      leaveType: leaveType ?? undefined,
      description: description ?? '',
    };
  }

  closeModal() {
    this.close.emit();
  }

  saveLeaveApplication() {
    if (this.leaveForm.invalid || this.saving()) {
      this.leaveForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    const dto = this.formToDto();
    const id = this.data()?.id;

    const request$ = id
      ? this.leaveService.updateLeaveApplication(dto, id)
      : this.leaveService.addNewLeaveApplication(dto);

    request$.subscribe({
      next: () => {
        this.notify.success(
          id ? 'Leave request updated successfully' : 'Leave request submitted successfully',
        );
        this.saved.emit();
        this.closeModal();
        this.leaveForm.reset();
        this.saving.set(false);
      },
      error: (err) => {
        this.notify.httpError(err, 'Could not save leave application. Please try again.');
        this.saving.set(false);
      },
    });
  }

  protected readonly Date = Date;
}
