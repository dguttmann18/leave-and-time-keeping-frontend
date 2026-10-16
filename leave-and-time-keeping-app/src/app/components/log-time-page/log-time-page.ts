import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { projects, timeSheets } from '../../data/time-sheet.data';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-log-time-page',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './log-time-page.html',
  styleUrl: './log-time-page.css',
})
export class LogTimePage {
  protected readonly projects = projects;
  protected readonly timeSheetEntries = timeSheets;
  private dateService = inject(DateService);

  parseDate(dateStr: string): Date {
    return this.dateService.parseDate(dateStr);
  }

  protected readonly Date = Date;
}
