import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-vacation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './vacation.component.html',
  styleUrl: './vacation.component.scss'
})
export class VacationComponent {
  VacationStart?: Date;
  VacationEnd?: Date;

  saveData() {

  }
}
