import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { isAndroid, View } from '@nativescript/core';

@Directive({
  selector: '[nsIfAndroid]'
})
export class IfAndroidDirective implements OnInit {

  ngOnInit() {
    if (isAndroid) {
      this.container.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private container: ViewContainerRef, private templateRef: TemplateRef<View>) { }

}
