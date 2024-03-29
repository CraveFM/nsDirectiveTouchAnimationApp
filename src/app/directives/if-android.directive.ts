import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { isAndroid, View } from '@nativescript/core';

@Directive({
  selector: '[appIfAndroid]'
})
export class IfAndroidDirective implements OnInit {

  constructor(private container: ViewContainerRef, private templateRef: TemplateRef<View>) { }

  ngOnInit() {
    if (isAndroid) {
      this.container.createEmbeddedView(this.templateRef);
    }
  }

}
