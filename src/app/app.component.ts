// app.component.ts
import { Component } from '@angular/core';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { PersonListComponent } from './components/person-list/person-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [AddPersonComponent, PersonListComponent],
})
export class AppComponent {
  title = 'Address Book';
}