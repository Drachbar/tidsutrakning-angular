import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddWeekComponent} from "../add-week/add-week.component";
import {WeeksComponent} from "../weeks/weeks.component";
import {AppComponent} from "../../app.component";
import {WeekComponent} from "../week/week.component";
import {DayComponent} from "../day/day.component";
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    WeekComponent,
    DayComponent,
    AddWeekComponent,
    WeeksComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink
  ],
  exports: [
    AddWeekComponent,
    WeeksComponent
  ]
})
export class ComponentsModule { }
