import { Directive, ElementRef, HostListener } from '@angular/core';
import { TouchGestureEventData, View } from '@nativescript/core';
import { CoreTypes } from '@nativescript/core';

@Directive({
  selector: '[appTouchScaleAnimation]'
})
export class TouchScaleAnimationDirective {

  private view: View;
  private duration: number; 
  private currentAnimation;

  constructor(el: ElementRef) {
    this.view = el.nativeElement;
    this.duration = 0;
  }

  private animatePressed(): void {
    let view: View = this.view;
    if (this.currentAnimation) {
      this.currentAnimation.cancel();
    }
    this.currentAnimation = view.animate({ opacity: 0, duration: this.duration })
      .then(() => view.animate({ scale: { x: 0.98, y: 0.98 }, duration: this.duration }))
      .then(() => view.animate({ opacity: 0.8, duration: this.duration }))
      .then(() => view.animate({ curve: CoreTypes.AnimationCurve.easeIn, duration: this.duration } ))
      .catch((e) => { console.log(e.message); } );
  }

  private animateReleased(): void {
    let view: View = this.view;
    if (this.currentAnimation) {
      this.currentAnimation.cancel();
    }
    this.currentAnimation = view.animate({ opacity: 0, duration: this.duration })
      .then(() => view.animate({ scale: { x: 1, y: 1 }, duration: this.duration }))
      .then(() => view.animate({ opacity: 1, duration: this.duration }))
      .then(() => view.animate({ curve: CoreTypes.AnimationCurve.easeIn, duration: this.duration } ))
      .catch((e) => { console.log(e.message); } );
  }

  @HostListener('touch', ['$event'])
  onTouch(args: TouchGestureEventData): void {
    console.log('action: ' + args.action);
    if (args.action === 'down') {
        this.animatePressed();
    } else if (args.action === 'up') {
        this.animateReleased();
    }
  }



}
