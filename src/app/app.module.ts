import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {weekReducer} from "./store/weeks/week.reducer";
import {EffectsModule} from '@ngrx/effects';
import {WeekEffects} from "./store/weeks/week.effects";
import {SettingsComponent} from "./components/settings/settings.component";
import {DaysOffEffects} from "./store/days-off/days-off.effects";
import {daysOffReducer} from "./store/days-off/days-off.reducer";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      weeks: weekReducer,
      daysOff: daysOffReducer
    }),
    EffectsModule.forRoot([WeekEffects, DaysOffEffects]),
    SettingsComponent,
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
