import { Directive, ElementRef, HostListener } from '@angular/core';
import { TouchGestureEventData } from '@nativescript/core';
import { AnimationCurve } from '@nativescript/core/ui/enums';

@Directive({
  selector: '[nsTouchScaleAnimation]'
})
export class TouchScaleAnimationDirective {

  private element: ElementRef;
  private currentAnimation: Animation;

  constructor(el: ElementRef) {
    this.element = el;
  }

  private animatePressed(): void {
    if (this.currentAnimation) {
        this.currentAnimation.cancel();
    }
    this.currentAnimation = this.element.nativeElement.animate({
        scale: { x: 0.98, y: 0.98 },
        opacity: 0.8,
        curve: AnimationCurve.easeIn,
        duration: 100
    }).catch(() => {});
  }

  private animateReleased(): void {
      if (this.currentAnimation) {
          this.currentAnimation.cancel();
      }
      this.currentAnimation = this.element.nativeElement.animate({
          scale: { x: 1, y: 1 },
          opacity: 1,
          curve: AnimationCurve.easeIn,
          duration: 100
      }).catch(() => {});
  }

  @HostListener('touch', ['$event'])
  onTouch(args: TouchGestureEventData): void {
      if (args.action === 'down') {
          this.animatePressed();
      } else if (args.action === 'up') {
          this.animateReleased();
      }
  }

}
