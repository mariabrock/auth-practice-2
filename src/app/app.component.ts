import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { DataStorageService } from "./shared/datastorage.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private userSub: Subscription
  collapsed = true;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !user ? false : true;
        console.log(!user);
        console.log(!!user);
      }
    );
  }

  onSaveData() {
    this.dataStorageService.storeData();
  }

  onFetchData() {
    console.log("Data has been fetched")
  }

  onLogout() {
    this.authService.logout();
  }
}
