import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { Modal } from '../../shared/modal/modal';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { Project, ProjectRequest } from '../../../models/time-sheet.model';

@Component({
  selector: 'app-project-modal',
  imports: [Modal, ReactiveFormsModule, FormsModule],
  templateUrl: './project-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class ProjectModal implements OnInit {
  private timeSheetService = inject(TimeSheetService);

  clients: string[] = this.timeSheetService.getAllClients();
  newProject: ProjectRequest = { name: '', client: '', description: '' };
  projects = signal<Project[]>([]);
  saving = signal(false);
  saveError = signal<string | null>(null);
  projectForm!: FormGroup;
  data = input<Project>();
  isOpen = input.required<boolean>();
  close = output<void>();

  // protected readonly projects = projects;
  protected readonly Date = Date;

  constructor() {
    effect(() => {
      const project = this.data();
      if (project) {
        this.projectForm.patchValue({
          name: project.name,
          client: project.client,
          description: project.description,
        });
      } else {
        this.projectForm.reset();
      }
    });
  }

  ngOnInit() {
    this.loadProjects();
    this.setupProjectForm();
  }



  setupProjectForm() {
    this.projectForm = new FormGroup({
      client: new FormControl(this.data()?.client),
      name: new FormControl(this.data()?.name),
      description: new FormControl(this.data()?.description),
    });
  }

  formToDto(): ProjectRequest {
    const { name, client, description } = this.projectForm.value;

    return {
      name: name ?? '',
      client: client ?? undefined,
      description: description ?? undefined,
    };
  }

  closeModal() {
    this.close.emit();
  }

  saveProject() {
    if (this.projectForm.invalid || this.saving()) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.saveError.set(null);

    const dto = this.formToDto();
    const id = this.data()?.id;

    const request$ = id
      ? this.timeSheetService.updateProject(dto, id)
      : this.timeSheetService.addNewProject(dto);

    request$.subscribe({
      next: () => {
        this.projectForm.reset();
        this.saving.set(false);
        this.closeModal();
      },
      error: (err) => {
        console.error('Failed to save project', err);
        this.saveError.set('Could not save the project. Please try again.');
        this.saving.set(false);
      },
    });
  }

  loadProjects() {
    this.timeSheetService.getAllProjects().subscribe({
      next: (projects) => this.projects.set(projects),
      error: (err) => console.error('Failed to load projects', err),
    });
  }
}
