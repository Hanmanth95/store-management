import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-store-dialog",
  templateUrl: "./store-dialog.component.html",
  styleUrls: ["./store-dialog.component.css"],
})
export class StoreDialogComponent implements OnInit {
  copyData: any;
  displayText: String = "Create Store";
  constructor(
    public dialogRef: MatDialogRef<StoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.copyData = { ...this.data };
    if (this.data) {
      this.displayText = "Update Store";
    } else {
      this.displayText = "Create Store";
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
