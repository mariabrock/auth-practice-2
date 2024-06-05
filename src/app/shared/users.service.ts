import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersChanged = new Subject<User[]>();

  constructor() { }

  private users: User[] = [];

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers () {
    return this.users.slice();
  }

  getUser(index: number) {
    return this.users[index];
  }

  addUser(recipe: User) {
    this.users.push(recipe);
    this.usersChanged.next(this.users.slice());
  }

  updateUser(index: number, newUser: User) {
    this.users[index] = newUser;
    this.usersChanged.next(this.users.slice());
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);0
    this.usersChanged.next(this.users.slice());
  }
}
