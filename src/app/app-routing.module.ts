import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ClaimComponent } from './claim/claim.component';
import { MenuComponent } from './menu/menu.component';
import { OtherPartyComponent } from './other-party/other-party.component';
import { AccidentComponent } from './accident/accident.component';
import { DocumentsComponent } from './documents/documents.component';
import { AuthGuard } from './auth/auth.guard';

const routes : Routes =[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path : 'home' , component : HomeComponent  },
  

  { path : 'user', 
    children : [
      { path : 'profile' , component : ProfileComponent },
    ] 
  },
  
  { path : 'menu', 
  children : [
    { path : 'options' , component : MenuComponent },
    //canActivate: [AuthGuard],
  ] 
},

  { path : 'claim' , 
  children : [
  {path : 'add' , component : ClaimComponent },
  {path : 'accident' , component : AccidentComponent },
  {path : 'otherParty' , component : OtherPartyComponent },
  {path : 'documents' , component : DocumentsComponent },

  
  ]
},

];

@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
