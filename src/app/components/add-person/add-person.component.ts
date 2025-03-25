import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faUser, faPhoneAlt, faMapMarkerAlt, faCity, faFlag, faMailBulk, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent {
  // Font Awesome Icons
  faUserPlus = faUserPlus;
  faUser = faUser;
  faPhoneAlt = faPhoneAlt;
  faMapMarkerAlt = faMapMarkerAlt;
  faCity = faCity;
  faFlag = faFlag;
  faMailBulk = faMailBulk;
  faSave = faSave;

  person: any = {
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  };

  cities: string[] = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad',
    'Chennai', 'Kolkata', 'Pune', 'Jaipur'
  ];

  states: string[] = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Telangana',
    'Tamil Nadu', 'West Bengal', 'Rajasthan', 'Uttar Pradesh'
  ];

  constructor(private personService: PersonService) {}

  addPerson() {
    if (this.person.fullName && this.person.phoneNumber) {
      this.personService.addPerson(this.person).subscribe({
        next: () => {
          alert('Contact added successfully!');
          this.resetForm();
        },
        error: (err) => {
          console.error('Error adding contact:', err);
          alert('Failed to add contact. Please try again.');
        }
      });
    }
  }

  resetForm() {
    this.person = {
      fullName: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    };
  }
}