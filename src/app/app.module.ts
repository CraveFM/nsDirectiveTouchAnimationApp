import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TouchScaleAnimationDirective } from "./directives/touch-scale-animation.directive";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        TouchScaleAnimationDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
