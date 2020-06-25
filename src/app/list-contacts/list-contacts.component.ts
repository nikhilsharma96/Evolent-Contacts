import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../shared/contact';
import { Router } from '@angular/router'
// import { relative } from 'path';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements OnInit {
  
  contacts:Contact[];
  constructor(private contactService:ContactsService,
    private router: Router) { }

  ngOnInit(): void {
    this.contactService.getUsers().subscribe((contact)=>{
      this.contacts=contact;
    },((err)=>console.log(err)))
  }
  // changeStatus(id:number){
  //   this.contactService.getUser(id);
  // }

  editContact(id:number){
    console.log(id);
    this.router.navigate(['/edit',id]);
  }

  addContact(){
    console.log(6);
    this.router.navigate(['/add-contact',-1]);  
  }
}
