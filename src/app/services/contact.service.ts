import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactRequestDto } from '../model/ContactRequestDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private apiUrl = 'https://finspire-portfolio-backend.onrender.com/api/v1/contact';
  
    constructor(private http: HttpClient) {}

  addContact(contact: ContactRequestDto): Observable<string> {
      return this.http.post<string>(this.apiUrl, contact);
  }

}
