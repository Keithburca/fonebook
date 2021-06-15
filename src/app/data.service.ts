import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './user.model';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { RouterLink } from '@angular/router';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ContactListComponent } from './contact-page/contact-list/contact-list.component';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  [x: string]: any;
  apiUrl = 'http://localhost:3000/user'
  users!:User[];
  idNumber!:number;
  lowerLimit:any;
  upperLimit:any;
  name!:string;
  email!:string;
  phone:any;
  idUpdate:any;


  @Output() selectContact = new EventEmitter;


  import! : [ ContactPageComponent, ContactViewComponent, ContactListComponent ];

  constructor(private _http:HttpClient) { }

  getUsers(){
    return this._http.get<User[]>(this.apiUrl);
  }

  deleteContact(i,user) {
    this.idNumber = user.id ;
    alert("Contact deleted!");
    return this._http.delete("http://localhost:3000/user/" + this.idNumber);

  }

  viewContact(i) {
    console.log(this.lowerLimit);
  }
  

  getContact(id){
    this.idUpdate = id;
    return this._http.get("http://localhost:3000/user/" + this.idUpdate)
  }


  addedContact(data){
    console.log(data);
    alert("Contact added!");
    
    return this._http.post(this.apiUrl,data)
  }

  updateFields(id,data){
    this.idUpdate = id;
    console.log(this.idUpdate);
    alert("Contact updated!");
    return this._http.put("http://localhost:3000/user/" + this.idUpdate, data)
  }
}