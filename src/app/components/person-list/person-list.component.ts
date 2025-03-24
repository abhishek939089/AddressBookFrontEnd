import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-list',
  standalone: true,
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  imports: [CommonModule], // ✅ Import CommonModule here
})
export class PersonListComponent implements OnInit {
  persons: any[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.personService.getPersons().subscribe(
      (data) => {
        this.persons = data;
      },
      (error) => {
        console.error('Error fetching data from API, loading hardcoded data.');
        this.loadHardcodedData(); // Load hardcoded data if API fails
      }
    );
  }

  loadHardcodedData() {
    this.persons = [
      {
        id: 1,
        fullName: 'John Doe',
        phoneNumber: '123-456-7890',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      },
      {
        id: 2,
        fullName: 'Jane Smith',
        phoneNumber: '987-654-3210',
        address: '456 Elm St',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
      },
      {
        id: 3,
        fullName: 'Abhishek Sharma',
        phoneNumber: '987-654-3210',
        address: '456 MTR',
        city: 'Mathura',
        state: 'UP',
        zipCode: '281406',
      },
    ];
  }

  deletePerson(id: number) {
    this.persons = this.persons.filter((person) => person.id !== id);
    alert('Person deleted successfully');
  }
}
