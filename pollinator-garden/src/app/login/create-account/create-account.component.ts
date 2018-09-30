import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  email: string;
  username: string;
  password: string;
  cpassword: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.password === this.cpassword)
    console.log(this.email + '\n' + this.username + '\n' +
    this.password + '\n' + this.cpassword);
  }

}
