import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { LeaveModal } from '../../modals/leave-modal/leave-modal';
import { DeleteLeaveModal } from '../../modals/delete-leave-modal/delete-leave-modal';
import { LeaveService } from '../../../services/leave.service';
import { Router } from '@angular/router';
import { LeaveApplication, LeaveDue } from '../../../models/leave.model';
import { dateRangeValidator } from '../../../validators/date-range.validator';

@Component({
  selector: 'app-apply-for-leave-page',
  imports: [DatePipe, ReactiveFormsModule, LeaveModal, DeleteLeaveModal],
  templateUrl: './apply-for-leave-page.html',
  styleUrl: './../../../app.css',
})
export class ApplyForLeavePage implements OnInit {
  private leaveService = inject(LeaveService);
  private dateService = inject(DateService);
  private router = inject(Router);

  protected readonly Date = Date;

  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  currentLeaveApplication!: LeaveApplication;
  orderBy = signal<string>('firstDay');
  isAscending = signal<boolean>(true);
  dateRangeForm = this.setupDateRangeForm();
  leaveDue = signal<LeaveDue>({ days: 0, hours: 0 });
  leaveTaken = signal(0);
  leaveApplications = signal<LeaveApplication[]>([]);

  ngOnInit() {
    this.loadLeaveApplications();
    this.getLeaveHoursDue();
  }

  loadLeaveApplications() {
    const { firstDay, lastDay } = this.dateRangeForm.getRawValue();
    if (this.dateRangeForm.invalid || !firstDay || !lastDay) {
      return;
    }

    this.leaveService.getLeaveApplicationInRange(firstDay, lastDay, this.orderBy(), this.isAscending()).subscribe({
      next: (leaveApplications) => {
        this.leaveApplications.set(leaveApplications);
        this.calculateLeaveHoursTaken();
      },
      error: (err) => console.error('Failed to load leave applications', err),
    });
  }

  setupDateRangeForm() {
    const { monday, sunday } = this.dateService.currentWeek();

    return new FormGroup(
      {
        firstDay: new FormControl<string | null>(monday, Validators.required),
        lastDay: new FormControl<string | null>(sunday, Validators.required),
      },
      { validators: dateRangeValidator },
    );
  }

  getLeaveHoursDue() {
    this.leaveService.getLeaveDue().subscribe({
      next: (hours) => {
        this.leaveDue.set(hours);
      },
      error: (err) => console.error('Failed to load leave due', err),
    });
  }

  calculateLeaveHoursTaken() {
    let hours: number = 0;
    this.leaveApplications().forEach((application) => {
      hours += application.hours ? application.hours : 0;
    });
    this.leaveTaken.set(hours);
  }

  softRefresh() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.softRefresh();
    this.isModalOpen = false;
  }

  openDeleteModal(leaveApplication: LeaveApplication) {
    this.isDeleteModalOpen = true;
    this.currentLeaveApplication = leaveApplication;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.softRefresh();
  }

  openEditModal(leaveApplication: LeaveApplication) {
    this.currentLeaveApplication = leaveApplication;
    this.openModal();
  }

  updateOrderBy(field: string) {
    if (this.orderBy() === field) this.isAscending.update((val: boolean) => !val);
    this.orderBy.set(field);
    this.loadLeaveApplications();
  }

  get firstDay(): string | null {
    return this.dateRangeForm.controls.firstDay.value;
  }

  parseDate(dateStr: string): Date {
    return this.dateService.parseDate(dateStr);
  }
}


