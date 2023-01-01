import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private renderer: Renderer2, private elRef: ElementRef) { }
//It's better to use [ngClass] for bootstrap5
}
