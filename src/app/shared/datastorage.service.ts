import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { UsersService } from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private usersService: UsersService) { }

  storeData() {
    const users = this.usersService.getUsers();
    this.http
      .put(
        'https://ng-materclass-course-project-default-rtdb.firebaseio.com/users.json',
        users
      )
      .subscribe(res => {
        console.log(res);
      });
  }

  fetchData() {
    return this.http
      .get<User[]>(
        'https://ng-materclass-course-project-default-rtdb.firebaseio.com/users.json')
  };

}
