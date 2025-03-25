import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressBook, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent {
  // Font Awesome Icons
  faAddressBook = faAddressBook;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(public personService: PersonService) {}

  deletePerson(id: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.personService.deletePerson(id).subscribe({
        error: (err) => console.error('Error deleting contact:', err)
      });
    }
  }
}