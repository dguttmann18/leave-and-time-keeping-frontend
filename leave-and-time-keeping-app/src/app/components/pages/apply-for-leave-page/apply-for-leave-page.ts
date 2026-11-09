import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { LeaveModal } from '../../modals/leave-modal/leave-modal';
import { DeleteLeaveModal } from '../../modals/delete-leave-modal/delete-leave-modal';
import { LeaveService } from '../../../services/leave.service';
import { Router } from '@angular/router';
import { LeaveApplication } from '../../../models/leave.model';

@Component({
  selector: 'app-apply-for-leave-page',
  imports: [DatePipe, ReactiveFormsModule, LeaveModal, DeleteLeaveModal],
  templateUrl: './apply-for-leave-page.html',
  styleUrl: './../../../app.css',
})
export class ApplyForLeavePage implements OnInit {
  private leaveService = inject(LeaveService);
  private dateService = inject(DateService);
  private router = inject(Router);

  protected readonly Date = Date;

  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  currentLeaveApplication!: LeaveApplication;
  leaveDue = signal(0);
  leaveTaken = signal(0);
  addNewLeaveApplicationModalOpen = signal(false);
  leaveApplications = signal<LeaveApplication[]>([]);

  ngOnInit() {
    this.loadLeaveApplications();
  }

  loadLeaveApplications() {
    this.leaveService.getAllLeaveApplications().subscribe({
      next: (leaveApplications) => {
        this.leaveApplications.set(leaveApplications);
        this.getLeaveHoursDue();
        this.calculateLeaveHoursTaken();
      },
      error: (err) => console.error('Failed to load leave applications', err),
    });
  }

  getLeaveHoursDue() {
    this.leaveService.getLeaveDue().subscribe({
      next: (hours) => {
        this.leaveDue.set(hours);
      },
      error: (err) => console.error('Failed to load leave due', err)
    });
  }

  calculateLeaveHoursTaken() {
    let hours: number = 0;
    this.leaveApplications().forEach((application) => {
      hours += application.hours ? application.hours : 0;
    });
    this.leaveTaken.set(hours);
  }

  softRefresh() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.softRefresh();
    this.isModalOpen = false;
  }

  openDeleteModal(leaveApplication: LeaveApplication) {
    this.isDeleteModalOpen = true;
    this.currentLeaveApplication = leaveApplication;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.softRefresh();
  }

  openEditModal(leaveApplication: LeaveApplication) {
    this.currentLeaveApplication = leaveApplication;
    this.openModal();
  }

  addNewLeaveApplication() {
    this.addNewLeaveApplicationModalOpen.set(true);
  }

  closeNewLeaveApplicationModal() {
    this.addNewLeaveApplicationModalOpen.set(false);
  }

  parseDate(dateStr: string): Date {
    return this.dateService.parseDate(dateStr);
  }
}


