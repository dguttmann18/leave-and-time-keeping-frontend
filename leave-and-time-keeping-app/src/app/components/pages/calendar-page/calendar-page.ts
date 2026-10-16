import { Component } from '@angular/core';
import { Calendar } from '../../calendar/calendar';

@Component({
  selector: 'app-calendar-page',
  imports: [Calendar],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
})
export class CalendarPage {
  currentMonth = 10;
  currentYear = 2026;
  displayMonths: boolean = false;

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  toggleDisplayMonths() {
    this.displayMonths = !this.displayMonths;
  }

  changeMonth(newMonth: number) {
    this.currentMonth = newMonth + 1;
    this.displayMonths = false;
  }

  getCurrentMonthName() {
    return this.months[this.currentMonth - 1];
  }
}
