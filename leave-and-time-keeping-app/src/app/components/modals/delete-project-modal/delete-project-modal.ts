import { Component, inject, input, output } from '@angular/core';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../shared/modal/modal';
import { ProjectModal } from '../project-modal/project-modal';
import { Project } from '../../../models/time-sheet.model';

@Component({
  selector: 'app-delete-project-modal',
  imports: [FormsModule, Modal],
  templateUrl: './delete-project-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class DeleteProjectModal {
  private timeSheetService = inject(TimeSheetService);

  data = input.required<Project>();
  isOpen = input.required<boolean>();
  close = output<void>();

  closeModal() {
    this.close.emit();
  }

  deleteProject() {
    const id = this.data().id;

    if (id) {
      this.timeSheetService.deleteProject(id).subscribe({
        next: () => this.closeModal(),
        error: (err) => console.error('Failed to delete project', err),
      });
    }
  }
}
