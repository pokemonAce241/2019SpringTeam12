import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css'],
  providers: [UserService]
})
export class MainLoginComponent implements OnInit {

  // Any variables you define here are accessible in the HTML
  users: User[];

  email: string;
  password: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
      });
  }

  onSubmit() {
    console.log(this.email, this.password);
    this.userService.login(this.email, this.password)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/garden']);
      });
  }

}
