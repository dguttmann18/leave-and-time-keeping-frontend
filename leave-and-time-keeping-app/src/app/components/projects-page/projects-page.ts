import { Component, inject, OnInit, signal } from '@angular/core';
import { Project, ProjectRequest } from '../../models/time-sheet.model';
import { TimeSheetService } from '../../services/time-sheet.service';
import { DatePipe, NgClass } from '@angular/common';
import { Modal } from '../modal/modal';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-projects-page',
  imports: [DatePipe, NgClass, Modal, FormsModule],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage implements OnInit {
  private timeSheetService = inject(TimeSheetService);

  projects = signal<Project[]>([]);
  clients: string[] = this.timeSheetService.getAllClients();

  newProject: ProjectRequest = { name: '', client: '', description: '' };
  saving = signal(false);
  saveError = signal<string | null>(null);

  addNewProjectModalOpen = signal(false);

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.timeSheetService.getAllProjects().subscribe({
      next: projects => this.projects.set(projects),
      error: err => console.error('Failed to load projects', err),
    });
  }

  saveProject(form: NgForm) {
    if (form.invalid || this.saving()) {
      form.control.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.saveError.set(null);

    this.timeSheetService.addNewProject(this.newProject).subscribe({
      next: () => {
        form.resetForm({ name: '', client: '', description: '' });
        this.saving.set(false);
        this.loadProjects();
      },
      error: err => {
        console.error('Failed to save project', err);
        this.saveError.set('Could not save the project. Please try again.');
        this.saving.set(false);
      },
    });
  }

  addNewProject() {
    this.addNewProjectModalOpen.set(true);
  }

  closeNewProjectModal() {
    this.addNewProjectModalOpen.set(false);
  }
}
