import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./store/products/products.component";
import { StoreComponent } from "./store/store.component";

const routes: Routes = [
  {
    path: "list",
    component: StoreComponent,
    children: [
      {
        path: "products",
        component: ProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
