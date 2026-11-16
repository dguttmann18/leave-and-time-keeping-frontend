import { Component, inject, input, output } from '@angular/core';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { Modal } from '../../shared/modal/modal';
import { Project } from '../../../models/time-sheet.model';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-delete-project-modal',
  imports: [Modal],
  templateUrl: './delete-project-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class DeleteProjectModal {
  private timeSheetService = inject(TimeSheetService);
  private notify = inject(NotificationService);

  data = input.required<Project>();
  isOpen = input.required<boolean>();

  close = output<void>();
  deleted = output<void>();

  closeModal() {
    this.close.emit();
  }

  deleteProject() {
    const id = this.data().id;
    if (!id) return;

    this.timeSheetService.deleteProject(id).subscribe({
      next: () => {
        this.notify.success(`Project "${this.data().name}" deleted`);
        this.deleted.emit();
        this.closeModal();
      },
      error: (err) => this.notify.httpError(err, 'Could not delete the project. Please try again.'),
    });
  }
}
