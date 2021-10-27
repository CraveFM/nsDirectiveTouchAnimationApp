import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { isIOS, View } from '@nativescript/core';

@Directive({
  selector: '[appIfIos]'
})
export class IfIosDirective implements OnInit {

  constructor(private container: ViewContainerRef, private templateRef: TemplateRef<View>) { }

  ngOnInit() {
    if (isIOS) {
      this.container.createEmbeddedView(this.templateRef);
    }
  }

}
