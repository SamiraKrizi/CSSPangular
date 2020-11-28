import { Component, OnInit } from '@angular/core';
import { TopNavbarComponent } from 'src/app/shared/top-navbar/top-navbar.component';
import { FooterService } from 'src/app/service/footer.service';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  constructor( public nav: NavbarService, public fot : FooterService) {}


   ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
  
    this.fot.show2();
    this.fot.doSomethingElseUseful2();
  }

}
