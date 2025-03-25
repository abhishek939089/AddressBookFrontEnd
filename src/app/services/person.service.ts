import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = 'http://localhost:8084/api/contacts';
  private personsSubject = new BehaviorSubject<any[]>([]);
  persons$ = this.personsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.personsSubject.next(this.mapToFrontendData(data));
    });
  }

  private mapToFrontendData(data: any[]): any[] {
    return data.map(person => ({
      id: person.id,
      fullName: person.name,
      phoneNumber: person.phone,
      address: person.address,
      city: person.city,
      state: person.state,
      zipCode: person.zipCode
    }));
  }

  getPersons(): Observable<any[]> {
    return this.persons$;
  }

  addPerson(person: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      name: person.fullName,
      phone: person.phoneNumber,
      address: person.address,
      city: person.city,
      state: person.state,
      zipCode: person.zipCode
    }).pipe(
      tap(newPerson => {
        const currentPersons = this.personsSubject.value;
        this.personsSubject.next([...currentPersons, this.mapToFrontendData([newPerson])[0]]);
      })
    );
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const updatedPersons = this.personsSubject.value.filter(p => p.id !== id);
        this.personsSubject.next(updatedPersons);
      })
    );
  }
}