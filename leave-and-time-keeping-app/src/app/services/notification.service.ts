import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private readonly base: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  success(message: string): void {
    this.snackBar.open(message, 'Close', {
      ...this.base,
      duration: 4000,
      panelClass: ['snackbar-success'],
    });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Close', {
      ...this.base,
      duration: 8000,
      panelClass: ['snackbar-error'],
    });
  }

  httpError(err: unknown, fallback: string): void {
    const detail = err instanceof HttpErrorResponse ? err.error?.detail : undefined;
    this.error(detail ?? fallback);
  }
}
