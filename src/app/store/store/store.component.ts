import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StoreDialogComponent } from "../store-dialog/store-dialog.component";
import { StoreService } from "../store.service";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css"],
})
export class StoreComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "location",
    "phone",
    "edit",
    "products",
  ];
  dataSource = [];
  constructor(private dialog: MatDialog, private storeService: StoreService) {}

  ngOnInit() {
    this.getAllStore();
  }

  getAllStore() {
    this.storeService.getAllStores().subscribe((res: any) => {
      if (res && res.status == "SUCCESS") {
        this.dataSource = res.data;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StoreDialogComponent, {
      width: "500px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.storeService.createStore(result).subscribe((res: any) => {
          if (res && res.status == "SUCCESS") {
            this.getAllStore();
          }
        });
      }
    });
  }

  openEditDialog(store) {
    const dialogRef = this.dialog.open(StoreDialogComponent, {
      width: "500px",
      data: store,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.oldName = store.name;
        this.storeService.updateStore(result).subscribe((res: any) => {
          if (res && res.status == "SUCCESS") {
            this.getAllStore();
          }
        });
      }
    });
  }
}
