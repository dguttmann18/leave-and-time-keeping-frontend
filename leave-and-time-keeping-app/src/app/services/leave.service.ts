import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaveApplication, LeaveApplicationRequest, LeaveDue } from '../models/leave.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private http = inject(HttpClient);
  private readonly apiUrl = '/api';

  addNewLeaveApplication(leaveApplication: LeaveApplicationRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/leave_application/new`, leaveApplication);
  }

  updateLeaveApplication(leaveApplication: LeaveApplicationRequest, id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/leave_application/update/${id}`, leaveApplication);
  }

  getLeaveApplication(id: number): Observable<LeaveApplication> {
    return this.http.get<LeaveApplication>(`${this.apiUrl}/leave_application/${id}`);
  }

  getAllLeaveApplications(): Observable<LeaveApplication[]> {
    return this.http.get<LeaveApplication[]>(`${this.apiUrl}/leave_application/all`);
  }

  getLeaveApplicationInRange(firstDay: Date, lastDay: Date): Observable<LeaveApplication[]> {
    return this.http.get<LeaveApplication[]>(`${this.apiUrl}/leave_application/${firstDay}/${lastDay}`);
  }

  deleteLeaveApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/leave_application/${id}`);
  }

  getLeaveDue(): Observable<LeaveDue> {
    return this.http.get<LeaveDue>(`${this.apiUrl}/leave_due`);
  }
}
