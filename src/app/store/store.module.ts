import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreRoutingModule } from "./store-routing.module";
import { StoreComponent } from "./store/store.component";
import { ProductsComponent } from "./store/products/products.component";
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
} from "@angular/material";
import { StoreDialogComponent } from "./store-dialog/store-dialog.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [StoreComponent, ProductsComponent, StoreDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreRoutingModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],

  entryComponents: [StoreDialogComponent],
})
export class StoreModule {}
