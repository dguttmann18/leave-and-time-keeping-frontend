import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { TimeSheetModal } from '../../modals/time-sheet-modal/time-sheet-modal';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { Project, TimeSheetEntry } from '../../../models/time-sheet.model';
import { DeleteTimeSheetModal } from '../../modals/delete-time-sheet-modal/delete-time-sheet-modal';
import { Router } from '@angular/router';
import { LeaveService } from '../../../services/leave.service';
import { LeaveDue } from '../../../models/leave.model';
import { dateRangeValidator } from '../../../validators/date-range.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-time-sheet-page',
  imports: [DatePipe, ReactiveFormsModule, DecimalPipe, TimeSheetModal, DeleteTimeSheetModal],
  templateUrl: './time-sheet-page.html',
  styleUrls: ['./../../../app.css'],
})
export class TimeSheetPage implements OnInit {
  private dateService = inject(DateService);
  private timeSheetService = inject(TimeSheetService);
  private leaveService = inject(LeaveService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  protected readonly Date = Date;

  timesheets = signal<TimeSheetEntry[]>([]);
  projects = signal<Project[]>([]);
  leaveDue = signal<LeaveDue>({ days: 0, hours: 0 });
  hoursLogged = signal(0);
  dateRangeForm = this.setupDateRangeForm();
  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  currentTimeSheetEntry?: TimeSheetEntry;

  ngOnInit() {
    this.reloadTimeSheets();
    this.getLeaveHoursDue();

    this.dateRangeForm.controls.firstDay.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((first) => {
      const last = this.dateRangeForm.controls.lastDay.value;
      if (first && last && last < first) {
        this.dateRangeForm.controls.lastDay.setValue(null);
      }
    });
  }

  getLeaveHoursDue() {
    this.leaveService.getLeaveDue().subscribe({
      next: (leave) => this.leaveDue.set(leave),
      error: (err) => console.error('Failed to load leave due', err),
    });
  }

  loadTimeSheets() {
    this.timeSheetService.getAllActiveTimeSheetEntries().subscribe({
      next: (timesheets) => {
        this.timesheets.set(timesheets);
        this.getLeaveHoursDue();
        this.calculateHoursLogged();
      },
      error: (err) => console.error('Failed to load timesheets', err),
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

  calculateHoursLogged() {
    let hours: number = 0;
    this.timesheets().forEach((entry) => {
      hours += entry.hours;
    });
    this.hoursLogged.set(hours);
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

  openAddModal() {
    this.currentTimeSheetEntry = undefined;
    this.openModal();
  }

  closeModal() {
    this.isModalOpen = false;
    this.reloadTimeSheets();
  }

  openDeleteModal(timeSheetEntry: TimeSheetEntry) {
    this.isDeleteModalOpen = true;
    this.currentTimeSheetEntry = timeSheetEntry;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.softRefresh();
  }

  openEditModal(timeSheetEntry: TimeSheetEntry) {
    this.currentTimeSheetEntry = timeSheetEntry;
    this.openModal();
  }

  parseDate(dateStr: string): Date {
    return this.dateService.parseDate(dateStr);
  }

  get firstDay(): string | null {
    return this.dateRangeForm.controls.firstDay.value;
  }

  updateDateRange() {
    const { firstDay, lastDay } = this.dateRangeForm.getRawValue();
    if (this.dateRangeForm.invalid || !firstDay || !lastDay) {
      return;
    }

    this.timeSheetService.getAllActiveTimeSheetEntriesBetween(firstDay, lastDay).subscribe({
      next: (timesheets) => {
        this.timesheets.set(timesheets);
        this.calculateHoursLogged();
      },
      error: (err) => console.error('Failed to load timesheets in range', err),
    });
  }

  reloadTimeSheets() {
    const { firstDay, lastDay } = this.dateRangeForm.getRawValue();
    if (firstDay && lastDay && this.dateRangeForm.valid) {
      this.updateDateRange();
    } else {
      this.loadTimeSheets();
    }
  }
}
