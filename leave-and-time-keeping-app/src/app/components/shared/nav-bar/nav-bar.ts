import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [NgClass],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private router = inject(Router);
  activePage = 'calendar';
  timeSheetsExpanded = false;
  leaveExpanded = false;

  toggleTimeSheetsExpanded() {
    this.timeSheetsExpanded = !this.timeSheetsExpanded;
  }

  toggleLeaveExpanded() {
    this.leaveExpanded = !this.leaveExpanded;
  }

  applyForLeave() {
    this.activePage = 'apply-for-leave';
    this.router.navigate(['/leave/apply']);
  }

  logTime() {
    this.activePage = 'log-time';
    this.router.navigate(['/time/log']);
  }

  goToProjects() {
    this.activePage = 'projects';
    this.router.navigate(['/projects']);
  }

  goToCalendar() {
    this.activePage = 'calendar';
    this.router.navigate(['/calendar']);
  }
}
