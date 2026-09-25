import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { Footer } from './components/footer/footer';
import { Calendar } from './components/calendar/calendar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Footer, Calendar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('leave-and-time-keeping-app');
}
