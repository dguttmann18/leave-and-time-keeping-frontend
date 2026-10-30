import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { TimeSheetModal } from '../../modals/time-sheet-modal/time-sheet-modal';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { Project, TimeSheetEntry } from '../../../models/time-sheet.model';
import { DeleteProjectModal } from '../../modals/delete-project-modal/delete-project-modal';
import { DeleteTimeSheetModal } from '../../modals/delete-time-sheet-modal/delete-time-sheet-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-sheet-page',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    DecimalPipe,
    TimeSheetModal,
    DeleteProjectModal,
    DeleteTimeSheetModal,
  ],
  templateUrl: './time-sheet-page.html',
  styleUrls: ['./../../../app.css'],
})
export class TimeSheetPage implements OnInit {
  private dateService = inject(DateService);
  private timeSheetService = inject(TimeSheetService);
  private router = inject(Router);

  protected readonly Date = Date;

  timesheets = signal<TimeSheetEntry[]>([]);
  projects = signal<Project[]>([]);
  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  currentTimeSheetEntry?: TimeSheetEntry;
  addNewTimeSheetModalOpen = signal(false);

  ngOnInit() {
    this.loadTimeSheets();
  }

  loadTimeSheets() {
    this.timeSheetService.getAllActiveTimeSheetEntries().subscribe({
      next: (timesheets) => this.timesheets.set(timesheets),
      error: (err) => console.error('Failed to load timesheets', err),
    });
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
    this.softRefresh();
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

  addNewTimeSheetEntry() {
    this.addNewTimeSheetModalOpen.set(true);
  }

  closeNewTimeSheetModal() {
    this.addNewTimeSheetModalOpen.set(false);
  }
}
