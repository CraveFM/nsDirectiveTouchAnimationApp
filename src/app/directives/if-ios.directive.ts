import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { isIOS, View } from '@nativescript/core';

@Directive({
  selector: '[nsIfIos]'
})
export class IfIosDirective {

  constructor(container: ViewContainerRef, templateRef: TemplateRef<View>) {
    if (isIOS) {
        container.createEmbeddedView(templateRef);
    }
  }

}
