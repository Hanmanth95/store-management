import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StoreDialogComponent } from "../../store-dialog/store-dialog.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "category",
    "quantity",
    "description",
    "edit",
  ];
  dataSource = [
    {
      name: "Hydrogen",
      category: "Hydrogen@zen.com",
      quantity: 1.0079,
      description: "fdsf sd fsf sd",
    },
    {
      name: "Hydrogen",
      category: "Hydrogen@zen.com",
      quantity: 1.0079,
      description: "fdsf sd fsf sd",
    },
    {
      name: "Hydrogen",
      category: "Hydrogen@zen.com",
      quantity: 1.0079,
      description: "fdsf sd fsf sd",
    },
    {
      name: "Hydrogen",
      category: "Hydrogen@zen.com",
      quantity: 1.0079,
      description: "fdsf sd fsf sd",
    },
    {
      name: "Hydrogen",
      category: "Hydrogen@zen.com",
      quantity: 1.0079,
      description: "fdsf sd fsf sd",
    },
    {
      name: "Hydrogen",
      category: "Hydrogen@zen.com",
      quantity: 1.0079,
      description: "fdsf sd fsf sd",
    },
    {
      name: "Hydrogen",
      category: "Hydrogen@zen.com",
      quantity: 1.0079,
      description: "fdsf sd fsf sd",
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(StoreDialogComponent, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
