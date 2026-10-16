export class LocalDate {
  constructor(
    public readonly year: number,
    public readonly month: number,
    public readonly day: number
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.month < 1 || this.month > 12) {
      throw new Error('Month must be between 1 and 12.');
    }

    const daysInMonth = new Date(
      this.year,
      this.month,
      0
    ).getDate();

    if (this.day < 1 || this.day > daysInMonth) {
      throw new Error(
        `Day must be between 1 and ${daysInMonth} for ${this.year}-${this.month}.`
      );
    }
  }

  /**
   * Creates a LocalDate from a string such as "2026-10-01".
   */
  static parse(value: string): LocalDate {
    const parts = value.split('-');

    if (parts.length !== 3) {
      throw new Error('Invalid date format. Expected YYYY-MM-DD.');
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    return new LocalDate(year, month, day);
  }


  /**
   * Returns today's date.
   */
  static today(): LocalDate {
    const now = new Date();

    return new LocalDate(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    );
  }

  /**
   * Converts the date to YYYY-MM-DD.
   */
  toString(): string {
    return [
      this.year.toString().padStart(4, '0'),
      this.month.toString().padStart(2, '0'),
      this.day.toString().padStart(2, '0')
    ].join('-');
  }

  /**
   * Returns whether this date is before another date.
   */
  isBefore(other: LocalDate): boolean {
    return this.toString() < other.toString();
  }

  /**
   * Returns whether this date is after another date.
   */
  isAfter(other: LocalDate): boolean {
    return this.toString() > other.toString();
  }

  /**
   * Returns whether two dates are equal.
   */
  equals(other: LocalDate): boolean {
    return (
      this.year === other.year &&
      this.month === other.month &&
      this.day === other.day
    );
  }
}
