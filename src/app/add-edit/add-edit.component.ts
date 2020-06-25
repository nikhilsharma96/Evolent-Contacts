import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONTACTS } from '../shared/contacts';
import { Contact, Status } from '../shared/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  @ViewChild('cForm') contactFormDirective;
  addContactForm: FormGroup;
  contactCopy: Contact;
  contact: Contact;
  id : number;
  status =Status;
  constructor(private fb: FormBuilder,
    private acRoute:ActivatedRoute,
    private contactService: ContactsService,
    private route: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.acRoute.paramMap.subscribe((params)=>{
      const contactId= +params.get('id');
      console.log(params);
      if(contactId>=0){
      console.log(contactId)
      this.getContact(contactId);
    }
    else{
        this.contactService.getUsers().subscribe
        ((data:Contact[])=>{console.log(data.length);
          this.contact={
            id:data.length+1,
            First_Name:"",
            Last_Name:"",
            Email:"",
            PhoneNumber:0,  
            Status: "Invalid"      
          }
        },((err)=>console.log(err)));
      }
    })
  }

  formErrors={
    First_Name:"",
    Last_Name:"",
    Email:"",
    PhoneNumber:0,
  };

  validationMessage={
    'First_Name':{
      'required': 'First Name is required.',
      'minlength': 'First Name must be atleast 2 characters long',
      'maxlength': 'First Name can not be more than 25 characters long'
    },
    'Last_Name':{
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be atleast 2 characters long',
      'maxlength': 'Last Name can not be more than 25 characters long'
    },
    'Email':{
      'required': 'Email is required',
      'email': 'Email is not in a valid format'
    },
    'PhoneNumber':{
      'required':  'Phone Number is required',
      'pattern':  'Phone Number must contain only numbers'
    }
  }

  getContact(id:number){
    this.id=id;
    console.log(this.id);
    this.contactService.getUser(id)
    .subscribe((contact:Contact)=>{this.editContact(contact),console.log(contact),
      this.contact=contact},(err)=>console.log(err)
      );
  }

  editContact(contact:Contact){
    console.log(contact);
    this.addContactForm.patchValue({
      First_Name:contact.First_Name,
      Last_Name:contact.Last_Name,
      Email:contact.Email,
      PhoneNumber:contact.PhoneNumber,
      Status:contact.Status
    })
  }

  createForm(){
    this.addContactForm = this.fb.group({
      First_Name: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      Last_Name: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      Email: ['',[Validators.required,Validators.email]],
      PhoneNumber: [0,[Validators.required,Validators.pattern]],
      Status: 'Invalid'
    });
    this.addContactForm.valueChanges
      .subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if(!this.addContactForm)
      return;
    const form = this.addContactForm;
    for( const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]="";
        const control= form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessage[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+ ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.mapFormvalues();
    
    if(this.id>=0){
      console.log("hi")
      this.contactService.updateUser(this.contact)
      .subscribe(()=>
      this.route.navigate(['/home']),
      (err)=>console.log(err))
    }
    else{
      console.log(5);
      this.contactService.addEmployee(this.contact)
      .subscribe(()=>
      this.route.navigate(['/home']),
      (err)=>console.log(err)); 
      this.contactFormDirective.resetForm() 
   }    
  }
  mapFormvalues(){
    this.contact.First_Name = this.addContactForm.value.First_Name;
    this.contact.Last_Name = this.addContactForm.value.Last_Name;
    this.contact.Email = this.addContactForm.value.Email;
    this.contact.PhoneNumber = this.addContactForm.value.PhoneNumber;
    this.contact.Status = this.addContactForm.value.Status;
  }
}
