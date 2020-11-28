import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {  ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

import { AppComponent } from './app.component';
import { TopNavbarComponent } from './shared/top-navbar/top-navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { UserService } from './service/user.service';
import { ClaimComponent } from './claim/claim.component';
import { MenuComponent } from './menu/menu.component';
import { FormWizardModule } from 'angular2-wizard';
import { ArchwizardModule } from 'angular-archwizard';
import { MatSliderModule } from '@angular/material/slider';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LabelModule } from '@progress/kendo-angular-label';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';


import { UploadInterceptor } from './service/upload-interceptor.model';
import { ToastrModule } from 'ngx-toastr';
import { DialogModule, DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { OtherPartyComponent } from './other-party/other-party.component';
import { AccidentComponent } from './accident/accident.component';
import { DocumentsComponent } from './documents/documents.component';
import { RatingComponent } from './rating/rating.component';

import { ChatModule } from './chat/chat.module';
import { UserComponent } from './user/user.component';
import { ProfilComponent } from './user/profil/profil.component';
import { AdminComponent } from './user/admin/admin.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';








@NgModule({
  declarations: [
    
    AppComponent,
    TopNavbarComponent,
    FooterComponent,
    HomeComponent,
    ClaimComponent,
    MenuComponent,
    AccidentComponent,
    DocumentsComponent,
    OtherPartyComponent,
    SignUpComponent,
    SignInComponent,
    RatingComponent,
    AdminComponent,
    ProfilComponent,
    UserComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormWizardModule,
    ArchwizardModule,
    MatSliderModule,
    BrowserAnimationsModule,
    InputsModule,
    LayoutModule,
    LabelModule,
    UploadsModule,
    DropDownsModule,
    DateInputsModule,
    DialogModule,
    ButtonsModule,
    ToastrModule.forRoot(),
    DialogsModule,
    ChatModule
  ],

  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
