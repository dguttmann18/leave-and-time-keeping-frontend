import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { Footer } from './components/footer/footer';
import { Calendar } from './components/calendar/calendar';
import { CalendarContainer } from './components/calendar-container/calendar-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Footer, Calendar, CalendarContainer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('leave-and-time-keeping-app');
}
