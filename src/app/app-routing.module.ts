import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from "./components/settings/settings.component";
import {WeekWrapperComponent} from "./components/week-wrapper/week-wrapper.component";

const routes: Routes = [
  {path: '', component: WeekWrapperComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
