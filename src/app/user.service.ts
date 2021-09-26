import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

const USER_URL = environment.USER_URL;
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  loginSub = new Subject();
  createUser(user) {
    return this.http.post(USER_URL + "/create", { userData: user });
  }

  createSubUser(user) {
    return this.http.post(USER_URL + "/create/subuser", { userData: user });
  }

  login(user) {
    return this.http.post(USER_URL + "/login", { userData: user });
  }

  getAllSubUsers() {
    return this.http.get(USER_URL + "/get/subusers");
  }

  updateSubUsers(user) {
    return this.http.post(USER_URL + "/update/subusers", { userData: user });
  }
}
