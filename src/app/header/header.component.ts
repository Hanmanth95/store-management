import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  showTabs: boolean = false;
  showUsers: boolean = false;
  unSub: any;
  constructor(
    private cookie: CookieService,
    private route: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.unSub = this.userService.loginSub.subscribe((data) => {
      if (this.cookie.get("token")) {
        this.showTabs = true;
      } else {
        this.showTabs = false;
      }

      if (this.cookie.get("role") && this.cookie.get("role") == "ADMIN") {
        this.showUsers = true;
      } else {
        this.showUsers = false;
      }
    });

    if (this.cookie.get("token") && this.cookie.get("role") == "ADMIN") {
      this.showTabs = true;
    } else {
      this.showTabs = false;
    }

    if (this.cookie.get("role")) {
      this.showUsers = true;
    } else {
      this.showUsers = false;
    }
  }

  logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.route.navigate(["/login"]);
    this.showTabs = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unSub.unsubscribe();
  }
}
