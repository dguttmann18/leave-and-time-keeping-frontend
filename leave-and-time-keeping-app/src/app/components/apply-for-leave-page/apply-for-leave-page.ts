import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateService } from '../../services/date.service';
import { leaveApplications } from '../../data/leave.data';

@Component({
  selector: 'app-apply-for-leave-page',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './apply-for-leave-page.html',
  styleUrl: './apply-for-leave-page.css',
})
export class ApplyForLeavePage {
  protected readonly leaveApplications = leaveApplications;
  protected readonly Date = Date;

  private dateService = inject(DateService);

  parseDate(dateStr: string): Date {
    return this.dateService.parseDate(dateStr);
  }
}


