import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/service/footer.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public fot: FooterService) { }

  ngOnInit(): void {

  }
}
