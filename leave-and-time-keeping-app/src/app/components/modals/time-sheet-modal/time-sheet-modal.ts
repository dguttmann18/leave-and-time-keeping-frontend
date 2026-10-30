import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { Modal } from '../../shared/modal/modal';
import { Project, TimeSheetEntry, TimeSheetEntryRequest } from '../../../models/time-sheet.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeSheetService } from '../../../services/time-sheet.service';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-time-sheet-modal',
  imports: [Modal, FormsModule, ReactiveFormsModule],
  templateUrl: './time-sheet-modal.html',
  styleUrls: ['./../../shared/modal/modal.css'],
})
export class TimeSheetModal implements OnInit {
  private timeSheetService = inject(TimeSheetService);
  private dateService = inject(DateService);
  projects = signal<Project[]>([]);

  newTimeSheetEntry: TimeSheetEntryRequest = this.blankTimeSheetEntry();
  saving = signal(false);
  saveError = signal<string | null>(null);
  timeSheetForm: FormGroup = this.setupTimeSheetForm();
  data = input<TimeSheetEntry>();
  dataObject!: TimeSheetEntry | undefined;
  isOpen = input.required<boolean>();
  close = output<void>();

  // protected readonly projects = projects;
  protected readonly Date = Date;

  constructor() {
    effect(() => {
      const timeSheetEntry = this.data();
      this.dataObject = timeSheetEntry;

      if (timeSheetEntry) {
        this.timeSheetForm.patchValue({
          dateOfEntry: timeSheetEntry.dateOfEntry,
          projectId: timeSheetEntry.project?.id,
          hours: timeSheetEntry.hours,
          billable: timeSheetEntry.billable,
          description: timeSheetEntry.description
        });
      } else {
        this.timeSheetForm.reset({ dateOfEntry: this.dateService.today() });
      }
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  setupTimeSheetForm() {
    return new FormGroup({
      dateOfEntry: new FormControl(
        this.dataObject ? this.dataObject.dateOfEntry : this.dateService.today(),
      ),
      projectId: new FormControl(this.dataObject?.project?.id),
      hours: new FormControl(this.dataObject?.hours),
      billable: new FormControl(this.dataObject?.billable),
      description: new FormControl(this.dataObject?.description),
    });
  }

  formToDto(): TimeSheetEntryRequest {
    return {
      dateOfEntry: this.timeSheetForm.controls['dateOfEntry'].value,
      projectId: this.timeSheetForm.controls['projectId'].value,
      hours: this.timeSheetForm.controls['hours'].value,
      billable: this.timeSheetForm.controls['billable'].value,
      description: this.timeSheetForm.controls['description'].value,
    };
  }

  loadProjects() {
    this.timeSheetService.getAllProjects().subscribe({
      next: (projects) => this.projects.set(projects),
      error: (err) => console.error('Failed to load projects', err),
    });
  }

  blankTimeSheetEntry() {
    return {
      dateOfEntry: '',
      projectId: -1,
      hours: 0,
      billable: false,
      description: '',
    };
  }

  closeModal() {
    this.close.emit();
  }

  saveTimeSheetEntry() {
    if (this.timeSheetForm.invalid || this.saving()) {
      this.timeSheetForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.saveError.set(null);

    const dto = this.formToDto();
    const id = this.data()?.id;

    const request$ = id
      ? this.timeSheetService.updateTimeSheetEntry(dto, id)
      : this.timeSheetService.addNewTimeSheetEntry(dto);

    request$.subscribe({
      next: () => {
        this.closeModal();
        this.timeSheetForm.reset({ dateOfEntry: this.dateService.today() });
        this.saving.set(false);

      },
      error: (err) => {
        console.error('Failed to save time sheet entry', err);
        this.saveError.set('Could not save the time sheet entry. Please try again.');
        this.saving.set(false);
      },
    });
  }
}
