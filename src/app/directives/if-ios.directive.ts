import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { isIOS, View } from '@nativescript/core';

@Directive({
  selector: '[nsIfIos]'
})
export class IfIosDirective implements OnInit {

  ngOnInit() {
    if (isIOS) {
      this.container.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private container: ViewContainerRef, private templateRef: TemplateRef<View>) { }

}
