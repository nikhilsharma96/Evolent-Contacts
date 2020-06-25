import { Injectable } from '@angular/core';
import { CONTACTS } from '../shared/contacts';
import { Contact } from '../shared/contact';
import { baseURL } from '../shared/baseURL';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  copy:Contact;
  prev:number;
  constructor( private httpClient: HttpClient) { }

  getUsers():Observable<Contact[]>{
    return this.httpClient.get<Contact[]>(baseURL+'users');
  }
  
  getUser(id:number):Observable<Contact>{
    return this.httpClient.get<Contact>(baseURL+'users/'+id);   
  }

  updateUser(contact:Contact): Observable<Contact> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.httpClient.put<Contact>(baseURL + 'users/' + contact.id, contact, httpOptions)
  }

  addEmployee(contact:Contact): Observable<Contact> {
    console.log(contact.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(this.httpClient.post<Contact>(baseURL + 'users/',contact, httpOptions));
    return this.httpClient.post<Contact>(baseURL + 'users/' ,contact, httpOptions)
}

// removeEmployee(id:Contact): Observable<Contact> {
//   console.log(contact.id);
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json'
//     })
//   };
//   console.log(this.httpClient.post<Contact>(baseURL + 'users/',contact, httpOptions));
//   return this.httpClient.delete<Contact>(baseURL + 'users/' ,contact, httpOptions)
// }
}