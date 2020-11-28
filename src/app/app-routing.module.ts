import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClaimComponent } from './claim/claim.component';
import { MenuComponent } from './menu/menu.component';
import { OtherPartyComponent } from './other-party/other-party.component';
import { AccidentComponent } from './accident/accident.component';
import { DocumentsComponent } from './documents/documents.component';
import { RatingComponent } from './rating/rating.component';
import { ChatDialogComponent } from './chat/chat-dialog/chat-dialog.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ProfilComponent } from './user/profil/profil.component';
import { AdminComponent } from './user/admin/admin.component';


const routes: Routes = [
  
  { path: 'home', component: HomeComponent},

  { 
    path: '',component: SignInComponent,
    children: [
      { path: 'login', component: SignInComponent },
      //{ path: '**', redirectTo: '' },
    ]
  },
  { path: 'register', component: SignUpComponent },
  { path: 'profil', component: ProfilComponent }, 


  {
    path: 'menu',
    children: [
      { path: 'options', component: MenuComponent },
    ]
  },

  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: AdminComponent },

    ]
  },

  {
    path: 'claim',
    children: [
      { path: 'add', component: ClaimComponent },
      { path: 'accident', component: AccidentComponent },
      { path: 'otherParty', component: OtherPartyComponent },
      { path: 'documents', component: DocumentsComponent },
    ]

  },
  { path: 'rating', component: RatingComponent },
  { path: 'chat', component: ChatDialogComponent },

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
