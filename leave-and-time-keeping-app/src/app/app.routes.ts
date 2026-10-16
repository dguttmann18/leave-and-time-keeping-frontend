import { Routes } from '@angular/router';
import { CalendarPage } from './components/pages/calendar-page/calendar-page';
import { ApplyForLeavePage } from './components/pages/apply-for-leave-page/apply-for-leave-page';
import { TimeSheetPage } from './components/pages/time-sheet-page/time-sheet-page';
import { ProjectsPage } from './components/pages/projects-page/projects-page';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "calendar",
    pathMatch: "full"
  },
  {
    path: "calendar",
    component: CalendarPage
  },
  {
    path: "leave/apply",
    component: ApplyForLeavePage
  },
  {
    path: "time/log",
    component: TimeSheetPage
  },
  {
    path: "projects",
    component: ProjectsPage
  }

];
