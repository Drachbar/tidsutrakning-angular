import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddWeekComponent } from './add-week/add-week.component';
import { FormsModule } from '@angular/forms';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './day/day.component';
import { WeeksComponent } from './weeks/weeks.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWeekComponent,
    WeekComponent,
    DayComponent,
    WeeksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
