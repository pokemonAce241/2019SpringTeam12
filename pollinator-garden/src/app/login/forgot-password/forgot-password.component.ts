import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.email);
  }

}
