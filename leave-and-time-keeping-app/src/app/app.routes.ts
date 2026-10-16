import { Routes } from '@angular/router';
import { CalendarContainer } from './components/calendar-container/calendar-container';
import { ApplyForLeavePage } from './components/apply-for-leave-page/apply-for-leave-page';
import { LogTimePage } from './components/log-time-page/log-time-page';
import { ProjectsPage } from './components/projects-page/projects-page';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "calendar",
    pathMatch: "full"
  },
  {
    path: "calendar",
    component: CalendarContainer
  },
  {
    path: "leave/apply",
    component: ApplyForLeavePage
  },
  {
    path: "time/log",
    component: LogTimePage
  },
  {
    path: "projects",
    component: ProjectsPage
  }

];
