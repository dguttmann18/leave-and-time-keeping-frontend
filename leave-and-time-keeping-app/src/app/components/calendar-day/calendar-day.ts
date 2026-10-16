import { Component, input } from '@angular/core';
import { LocalDate } from '../../models/local-date.model';
import { LeaveApplication } from '../../models/leave.model';

@Component({
  selector: 'app-calendar-day',
  imports: [],
  templateUrl: './calendar-day.html',
  styleUrl: './calendar-day.css',
})
export class CalendarDay {

  date = input.required<LocalDate>();
  events = input<LeaveApplication[]>();
}
