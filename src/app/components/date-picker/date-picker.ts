import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { signal } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  imports: [MatFormFieldModule, MatDatepickerModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker {

  // Signal to store the selected date range
  readonly dateRange = signal<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  // Called when the date range changes
  onDateRangeChange(event: { start: Date | null; end: Date | null }) {
    this.dateRange.set(event);
  }

  // Calculate the number of days selected and multiply by 4
  get daysTimesFour(): number {
    const { start, end } = this.dateRange();
    if (!start || !end) return 0;
    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.ceil((end.getTime() - start.getTime()) / msPerDay) + 1;
    return days * 4;
  }
}
