import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { TouchScaleAnimationDirective } from "../directives/touch-scale-animation.directive";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

import { IfAndroidDirective } from "../directives/if-android.directive";
import { IfIosDirective } from "../directives/if-ios.directive";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
        TouchScaleAnimationDirective,
        IfAndroidDirective,
        IfIosDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
