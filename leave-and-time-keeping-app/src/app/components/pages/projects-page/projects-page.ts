import { Component, inject, OnInit, signal } from '@angular/core';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectModal } from '../../modals/project-modal/project-modal';
import { Project } from '../../../models/time-sheet.model';
import { DeleteProjectModal } from '../../modals/delete-project-modal/delete-project-modal';

@Component({
  selector: 'app-projects-page',
  imports: [DatePipe, FormsModule, ProjectModal, DeleteProjectModal],
  templateUrl: './projects-page.html',
  styleUrls: ['./../../../app.css'],
})
export class ProjectsPage implements OnInit {
  private timeSheetService = inject(TimeSheetService);

  isModalOpen: boolean = false;

  isDeleteModalOpen: boolean = false;
  currentProject!: Project;

  projects = signal<Project[]>([]);

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.timeSheetService.getAllProjects().subscribe({
      next: (projects) => this.projects.set(projects),
      error: (err) => console.error('Failed to load projects', err),
    });
  }

  openAddModal() {
    this.currentProject = { name: '', client: '', description: '' } as Project;
    this.openModal();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDeleteModal(project: Project) {
    this.isDeleteModalOpen = true;
    this.currentProject = project;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  openEditModal(project: Project) {
    this.currentProject = project;
    this.openModal();
  }
}
