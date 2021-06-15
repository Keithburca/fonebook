import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnChanges } from '@angular/core';
import { User } from '../../user.model';
import { DataService } from '../../data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { findIndex } from 'rxjs/operators';
import { UrlResolver } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ DataService ],
})
export class ContactListComponent implements OnInit{
  @ViewChild('nameInput') nameInputRef!: ElementRef;
  @ViewChild('phoneInput') phoneInputRef!: ElementRef;
  @ViewChild('emailInput') emailInputRef!: ElementRef;
  @Output() showAlert = new EventEmitter();

  users!:User[];

  title = 'angular-assessment';
  index!:number;
  lowerLimit!:number;
  upperLimit!:number;
  nameInputString!:string;
  


  constructor(private dataService: DataService, private router:ActivatedRoute, private routed:Router){}

  ngOnInit(){
    this.router.url.subscribe(url =>{return this.dataService.getUsers()
      .subscribe(data => this.users = data)})
    return this.dataService.getUsers()
      .subscribe(data => this.users = data);
  }


  deleteContact(i,user){
        this.routed.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.routed.navigate(['/contact-list/0']);
    });
    return this.dataService.deleteContact(i,user)
      .subscribe();
   }

  viewContact(i,user){
      return this.dataService.viewContact(i);
  }

  updateContact(i,user){
      this.showAlert.emit();
  }

}