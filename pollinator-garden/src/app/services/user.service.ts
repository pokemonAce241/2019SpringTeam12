import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class User {
  email: string;
  hashedPass: string;
}

const USERS: User[] = [
  {
    "email": "kabartus@ncsu.edu",
    "hashedPass": "password"
  },
  {
    "email": "thle@ncsu.edu",
    "hashedPass": "12345"
  }
]

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(USERS);
  }

  login(email: string, password: string): Observable<any> {
    localStorage.setItem("currentUser", JSON.stringify(USERS[0]));
    return of({"email": USERS[0].email});
  }
}
