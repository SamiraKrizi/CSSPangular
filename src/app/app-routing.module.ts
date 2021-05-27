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
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ProfilComponent } from './user/profil/profil.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { UserComponent } from './user/user.component';
import { ShowClaimComponent } from './dashboard/show-claims/show-claim.component';
import { ShowMoreComponent } from './dashboard/show-more/show-more.component';
import { CompaniesComponent } from './dashboard/companies/companies.component';
import { OurClientsComponent } from './our-clients/our-clients.component';
import { DisplayClientClaimsComponent } from './display-client-claims/display-client-claims.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';


const routes: Routes = [

  { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'claimList', component: ShowClaimComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'showMore', component: ShowMoreComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },

  {
    path: 'register', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'editUser', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'aboutUs', component: OurClientsComponent, canActivate: [AuthGuard] },
  { path: 'options', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'addClaim', component: ClaimComponent, canActivate: [AuthGuard] },
  { path: 'claimResponse', component: DisplayClientClaimsComponent, canActivate: [AuthGuard] },
  { path: 'rate', component: RatingComponent, canActivate: [AuthGuard] },

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
