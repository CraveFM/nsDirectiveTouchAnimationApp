import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { isAndroid, View } from '@nativescript/core';

@Directive({
  selector: '[nsIfAndroid]'
})
export class IfAndroidDirective {

  constructor(container: ViewContainerRef, templateRef: TemplateRef<View>) {
    if (isAndroid) {
      container.createEmbeddedView(templateRef);
    }
  }

}
