import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginregisterComponent } from "./loginregister/loginregister.component";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, LoginregisterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  exports: [LoginregisterComponent],
})
export class AppModule {}
