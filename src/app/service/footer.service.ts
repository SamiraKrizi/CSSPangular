import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  visible: boolean;

  constructor() { this.visible = false; }

  hide2() { this.visible = false; }

  show2() { this.visible = true; }

  toggle2() { this.visible = !this.visible; }

  doSomethingElseUseful2() { }
}
