import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { projects, timeSheets } from '../../../data/time-sheet.data';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-time-sheet-page',
  imports: [DatePipe, ReactiveFormsModule, DecimalPipe],
  templateUrl: './time-sheet-page.html',
  styleUrl: './../../../app.css',
})
export class TimeSheetPage {
  protected readonly projects = projects;
  protected readonly timeSheetEntries = timeSheets;
  private dateService = inject(DateService);

  parseDate(dateStr: string): Date {
    return this.dateService.parseDate(dateStr);
  }

  protected readonly Date = Date;
}
