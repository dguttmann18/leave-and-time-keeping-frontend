import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateRangeValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const first = group.get('firstDay')?.value;
  const last = group.get('lastDay')?.value;

  if (!first || !last) {
    return null;
  }

  return last < first ? { dateRange: true } : null;
};
