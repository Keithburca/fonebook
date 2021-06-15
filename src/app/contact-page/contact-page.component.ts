import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { User } from '../user.model';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { findIndex } from 'rxjs/operators';
import { UrlResolver } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  providers: [ DataService ],
})
export class ContactPageComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef!: ElementRef;
  @ViewChild('phoneInput') phoneInputRef!: ElementRef;
  @ViewChild('emailInput') emailInputRef!: ElementRef;
  @Output() contactAdded = new EventEmitter<User>();

  users!:User[];
  title = 'angular-assessment';
  index!:number;
  lowerLimit!:number;
  upperLimit!:number;
  nameInputString!:string;
  contactForm = new FormGroup({
    name: new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
  });  
  alert:boolean=false;
  alertEdit:boolean=false;
  alertMessage:string = "You have successfully created a new contact.";
  newButton:boolean=false;
  updateButton:boolean=true;


  constructor(private dataService: DataService, private router:ActivatedRoute, private routed:Router){}

  ngOnInit(){

   this.dataService.getContact(this.router.snapshot.params.id).subscribe((result)=>{
       this.contactForm = new FormGroup({
         name: new FormControl(result['name']),
         email:new FormControl(result['email']),
         phone:new FormControl(result['phone']),
       });
     });

     this.router.url.subscribe(url =>{
        this.dataService.getContact(this.router.snapshot.params.id).subscribe((result)=>{
          this.contactForm = new FormGroup({
            name: new FormControl(result['name']),
            email:new FormControl(result['email']),
            phone:new FormControl(result['phone']),
          });
        });

      });
      

  }

  collectInfo(){
    this.alert=true;
    this.alertEdit = false;
    this.contactForm.reset({})
  }
  addNew(){
    this.dataService.addedContact(this.contactForm.value).subscribe((result)=>{console.log(result)});
    this.routed.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.routed.navigate(['/contact-list/0']);
    })

  }

  closeAlert(){
    this.alert=false;
    this.alertEdit=false;
    this.routed.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.routed.navigate(['/contact-list/0']);
    })
  }

  showEditAlert(){
    this.alertEdit=true;
    this.alertMessage = "You have successfully edited an existing contact."
    this.updateButton = false;
    this.newButton = true;
    this.dataService.getContact(this.router.snapshot.params.id).subscribe((result)=>{
    this.contactForm = new FormGroup({
        name: new FormControl((result)['name']),
        email:new FormControl((result)['email']),
        phone:new FormControl((result)['phone']),
      });
    });
    
  }

  updateFields(){
    this.dataService.updateFields(this.router.snapshot.params.id, this.contactForm.value).subscribe((result)=>this.contactForm.value);
    this.routed.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.routed.navigate(['/contact-list/0']);
  })
  }
  }
