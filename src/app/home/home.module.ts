import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { TouchScaleAnimationDirective } from "../directives/touch-scale-animation.directive";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
        TouchScaleAnimationDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
