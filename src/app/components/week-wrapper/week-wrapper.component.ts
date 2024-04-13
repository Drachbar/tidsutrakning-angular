import { Component } from '@angular/core';
import {ComponentsModule} from "../components/components.module";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-week-wrapper',
  standalone: true,
  imports: [
    ComponentsModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './week-wrapper.component.html',
  styleUrl: './week-wrapper.component.scss'
})
export class WeekWrapperComponent {

}
