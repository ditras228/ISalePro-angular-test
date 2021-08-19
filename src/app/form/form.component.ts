import { Component, OnInit } from '@angular/core';
import {iUser} from "../table/user";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public user: iUser ={
    id: 1,
    firstName: 'Sue',
    lastName: 'Corson',
    email: 'DWhalley@in.gov',
    phone: '(612)211-6296',
    address: {
      streetAddress: '9792 Mattis Ct',
      city: 'Waukesha',
      state: 'WI',
      zip: '22178'
    },
    description: 'et lacus magna dolor...',
  }
  constructor() { }

  ngOnInit(): void {
    this.user={} as iUser
  }


  public submitFormHandler(){
  }

}
