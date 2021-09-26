import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const STORE_URL = environment.STORE_URL;
@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private http: HttpClient) {}

  createStore(store) {
    return this.http.post(STORE_URL + "/create/store", store);
  }

  updateStore(store) {
    return this.http.post(STORE_URL + "/update/store", store);
  }

  getAllStores() {
    return this.http.get(STORE_URL + "/get");
  }
}
