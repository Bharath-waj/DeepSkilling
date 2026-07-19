import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  transform(credits: number | null | undefined): string {
    // handling the edge cases first, null/0 shouldn't say "0 Credits"
    if (!credits) {
      return 'No Credits';
    }
    if (credits === 1) {
      return '1 Credit';
    }
    return `${credits} Credits`;
  }
}