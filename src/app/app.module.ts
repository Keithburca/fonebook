import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { DataService } from './data.service';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ContactListComponent } from './contact-page/contact-list/contact-list.component';

const appRoutes: Routes = [
  {path:'',component:HomepageComponent,pathMatch:'full'},
  // {path:'contact-list/0',component:ContactPageComponent,pathMatch:'full'},
  {path:'contact-details/:id',component:ContactViewComponent,pathMatch:'full'},
  {path: 'contact-list/:id', component:ContactPageComponent,pathMatch:'full'},
  {path:'**', component:ErrorPageComponent},
]



@Injectable()
export class ServiceNameService {
  constructor(private http: HttpClient) { }
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ContactPageComponent,
    HomepageComponent,
    ContactViewComponent,
    ContactListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }
