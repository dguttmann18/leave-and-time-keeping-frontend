import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { Modal } from '../../shared/modal/modal';
import { LeaveService } from '../../../services/leave.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LeaveApplication, LeaveApplicationRequest } from '../../../models/leave.model';
import { ProjectRequest } from '../../../models/time-sheet.model';

@Component({
  selector: 'app-leave-modal',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './leave-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class LeaveModal implements OnInit {
  private leaveService = inject(LeaveService);

  data = input<LeaveApplication>();
  isOpen = input.required<boolean>();
  close = output<void>();
  saving = signal(false);
  saveError = signal<string | null>(null);
  leaveForm: FormGroup = this.setupLeaveForm();

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

  ngOnInit() {}

  setupLeaveForm() {
    return new FormGroup({
      firstDay: new FormControl(this.data()?.firstDay),
      lastDay: new FormControl(this.data()?.lastDay),
      isPartial: new FormControl(this.data()?.isPartial),
      hours: new FormControl(this.data()?.hours),
      leaveType: new FormControl(this.data()?.leaveType),
      description: new FormControl(this.data()?.description),
    });
  }

  formToDto(): LeaveApplicationRequest {
    const {
      firstDay,
      lastDay,
      isPartial,
      hours,
      leaveType,
      description
    } = this.leaveForm.value;

    return {
      firstDay: firstDay ?? undefined,
      lastDay: lastDay ?? undefined,
      isPartial: isPartial ?? undefined,
      hours: hours ?? undefined,
      leaveType: leaveType ?? undefined,
      description: description ?? ''
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
    this.saveError.set(null);

    const dto = this.formToDto();
    const id = this.data()?.id;

    const request$ = id
      ? this.leaveService.updateLeaveApplication(dto, id)
      : this.leaveService.addNewLeaveApplication(dto);

    request$.subscribe({
      next: () => {
        this.leaveForm.reset();
        this.saving.set(false);
        this.closeModal();
      },
      error: (err) => {
        console.error('Failed to save leave application', err);
        this.saveError.set('Could not save the leave application. Please try again.');
        this.saving.set(false);
      },
    });
  }

  protected readonly Date = Date;
}
