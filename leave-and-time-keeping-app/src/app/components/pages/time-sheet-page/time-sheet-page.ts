import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { projects, timeSheets } from '../../../data/time-sheet.data';
import { DateService } from '../../../services/date.service';
import { Modal } from '../../shared/modal/modal';
import { TimeSheetModal } from '../../modals/time-sheet-modal/time-sheet-modal';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { TimeSheetEntry } from '../../../models/time-sheet.model';

@Component({
  selector: 'app-time-sheet-page',
  imports: [DatePipe, ReactiveFormsModule, DecimalPipe, Modal, TimeSheetModal],
  templateUrl: './time-sheet-page.html',
  styleUrls: ['./../../../app.css']
})
export class TimeSheetPage implements OnInit {
  private timeSheetService = inject(TimeSheetService);
  timesheets = signal<TimeSheetEntry[]>([]);

  protected readonly projects = projects;
  // protected readonly timeSheetEntries = timeSheets;
  // protected readonly timeSheetEntries = ;
  private dateService = inject(DateService);

  isModalOpen: boolean = false;

  ngOnInit() {
    this.loadTimeSheets();
  }

  loadTimeSheets() {
    this.timeSheetService.getAllActiveTimeSheetEntries().subscribe({
      next: (timesheets) => this.timesheets.set(timesheets),
      error: (err) => console.error('Failed to load timesheets', err),
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  parseDate(dateStr: string): Date {
    return this.dateService.parseDate(dateStr);
  }

  protected readonly Date = Date;
}
