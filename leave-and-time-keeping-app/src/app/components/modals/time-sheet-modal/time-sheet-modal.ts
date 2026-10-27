import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Modal } from '../../shared/modal/modal';
import { Project, TimeSheetEntry } from '../../../models/time-sheet.model';
import { FormsModule } from '@angular/forms';
import { projects } from '../../../data/time-sheet.data';
import { TimeSheetService } from '../../../services/time-sheet.service';

@Component({
  selector: 'app-time-sheet-modal',
  imports: [Modal, FormsModule],
  templateUrl: './time-sheet-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class TimeSheetModal implements OnInit {
  private timeSheetService = inject(TimeSheetService);
  projects = signal<Project[]>([]);

  data = input<TimeSheetEntry>();
  isOpen = input.required<boolean>();
  close = output<void>();

  // protected readonly projects = projects;
  protected readonly Date = Date;

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.timeSheetService.getAllProjects().subscribe({
      next: (projects) => this.projects.set(projects),
      error: (err) => console.error('Failed to load projects', err),
    });
  }

  closeModal() {
    this.close.emit();
  }

  // openModal() {
  //   this.isOpen = true;
  // }
  //
  // closeModal() {
  //   this.isOpen.(false);
  // }
}
