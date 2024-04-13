import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddWeekComponent } from './components/add-week/add-week.component';
import { FormsModule } from '@angular/forms';
import { WeekComponent } from './components/week/week.component';
import { DayComponent } from './components/day/day.component';
import { WeeksComponent } from './components/weeks/weeks.component';
import { StoreModule } from '@ngrx/store';
import { weekReducer } from "./store/weeks/week.reducer";
import { EffectsModule } from '@ngrx/effects';
import {WeekEffects} from "./store/weeks/week.effects";

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
    AppRoutingModule,
    StoreModule.forRoot({weeks: weekReducer}),
    EffectsModule.forRoot([WeekEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
