import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPageComponent } from './content-page/content-page.component';
import {ContentRoutingModule} from "./content-routing.module";


@NgModule({
  declarations: [
    ContentPageComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule
  ]
})
export class ContentModule { }
