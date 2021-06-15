import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../user.model'
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';
import { findIndex } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css'],
  providers: [ DataService ],
})
export class ContactViewComponent implements OnInit {
  users!:User[];
  selectedContact:any;
  page:any;
  pageCut!:number;

  constructor(private dataService: DataService, private router:ActivatedRoute){}

  ngOnInit(){

    
    this.dataService.getContact(this.router.snapshot.params.id).subscribe(result => {this.page = result['id']-1; this.pageCut=result['id']});


    return this.dataService.getUsers().subscribe(data => this.users = data);
  }
  returnList(){
    console.log(this.page)
  }

}
