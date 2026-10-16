import { Component, computed, input, OnInit } from '@angular/core';
import { CalendarDay } from '../calendar-day/calendar-day';
import { LocalDate } from '../../models/local-date.model';

@Component({
  selector: 'app-calendar',
  imports: [CalendarDay],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  month = input.required<number>();
  year = input.required<number>();

  days: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  weeks = computed<(LocalDate | null)[][]>(() => {
    const year = this.year();
    const month = this.month();

    const daysInMonth = new Date(year, month, 0).getDate();
    const offset = (new Date(year, month - 1, 1).getDay() + 6) % 7;

    const cells: (LocalDate | null)[] = [
      ...Array(offset).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => new LocalDate(year, month, i + 1)),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks: (LocalDate | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  });

  protected readonly Date = Date;
  protected readonly LocalDate = LocalDate;
}
