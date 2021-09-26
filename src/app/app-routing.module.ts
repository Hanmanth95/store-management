import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { LoginregisterComponent } from "./loginregister/loginregister.component";

const routes: Routes = [
  {
    path: "",
    component: LoginregisterComponent,
  },
  {
    path: "users",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersModule),
  },

  {
    path: "store",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./store/store.module").then((m) => m.StoreModule),
  },

  {
    path: "**",
    component: LoginregisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
