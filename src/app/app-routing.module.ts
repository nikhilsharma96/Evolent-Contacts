import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { AddEditComponent } from './add-edit/add-edit.component';


const routes: Routes = [
  {path:'home', component:ListContactsComponent},
  {path:'add-contact/:id',component:AddEditComponent},
  {path:'edit/:id',component:AddEditComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
