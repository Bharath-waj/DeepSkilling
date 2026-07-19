import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class Highlight {
  // letting the caller pass a custom color, defaults to yellow if they don't
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) {}

  // HostListener just hooks into the host element's events directly,
  // don't need to manually addEventListener/removeEventListener,
  // angular cleans it up automatically when the element is destroyed
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}