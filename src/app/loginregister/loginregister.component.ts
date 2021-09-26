import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../user.service";

@Component({
  selector: "app-loginregister",
  templateUrl: "./loginregister.component.html",
  styleUrls: ["./loginregister.component.css"],
})
export class LoginregisterComponent implements OnInit {
  upError: boolean = false;
  loginFormData = {
    email: "",
    password: "",
  };

  registerFormData = {
    name: "",
    email: "",
    password: "",
  };
  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private route: Router
  ) {}

  ngOnInit() {
    if (this.cookieService.get("token")) {
      if (this.cookieService.get("role") == "ADMIN") {
        this.route.navigate(["/users/list"]);
      } else {
        this.route.navigate(["/store/list"]);
      }
      this.userService.loginSub.next();
    }
  }

  login(f) {
    if (!f.valid) {
      return;
    }
    this.upError = false;
    this.userService.login(f.value).subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        document.cookie = "token=" + res.token + "; path=/";
        document.cookie = "role=" + res.role + "; path=/";
        if (res.role == "ADMIN") {
          this.route.navigate(["/users/list"]);
        } else {
          this.route.navigate(["/store/list"]);
        }
        this.userService.loginSub.next();
      } else {
        this.upError = true;
      }
    });
  }

  emailExists: boolean = false;
  register(f) {
    if (!f.valid) {
      return;
    }
    this.emailExists = false;
    this.userService.createUser(f.value).subscribe((res: any) => {
      if (res.status == "SUCCESS") {
        document.cookie = "token=" + res.token + "; path=/";
        document.cookie = "role=" + res.role + "; path=/";
        this.route.navigate(["/users/list"]);
        this.userService.loginSub.next();
      } else {
        this.emailExists = true;
      }
    });
  }
}
