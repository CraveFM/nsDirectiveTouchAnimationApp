import { Directive, ElementRef, HostListener } from '@angular/core';
import { TouchGestureEventData, View } from '@nativescript/core';
import { AnimationCurve } from '@nativescript/core/ui/enums';

@Directive({
  selector: '[nsTouchScaleAnimation]'
})
export class TouchScaleAnimationDirective {

  private view: View;
  private duration: number; 

  constructor(el: ElementRef) {
    this.view = el.nativeElement;
    this.duration = 0;
  }

  private animatePressed(): void {
    let view: View = this.view;
    view.animate({ opacity: 0, duration: this.duration })
      .then(() => view.animate({ scale: { x: 0.98, y: 0.98 }, duration: this.duration }))
      .then(() => view.animate({ opacity: 0.8, duration: this.duration }))
      .then(() => view.animate({ curve: AnimationCurve.easeIn, duration: this.duration } ))
      .catch((e) => { console.log(e.message); } );
    }

  private animateReleased(): void {
    let view: View = this.view;
    view.animate({ opacity: 0, duration: this.duration })
      .then(() => view.animate({ scale: { x: 1, y: 1 }, duration: this.duration }))
      .then(() => view.animate({ opacity: 1, duration: this.duration }))
      .then(() => view.animate({ curve: AnimationCurve.easeIn, duration: this.duration } ))
      .catch((e) => { console.log(e.message); } );
  }

  @HostListener('touch', ['$event'])
  onTouch(args: TouchGestureEventData): void {
    // console.log('action: ' + args.action);
    if (args.action === 'down') {
        this.animatePressed();
    } else if (args.action === 'up') {
        this.animateReleased();
    }
  }

}
