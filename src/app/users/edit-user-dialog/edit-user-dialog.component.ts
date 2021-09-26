import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-edit-user-dialog",
  templateUrl: "./edit-user-dialog.component.html",
  styleUrls: ["./edit-user-dialog.component.css"],
})
export class EditUserDialogComponent implements OnInit {
  copyData: any;
  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.copyData = { ...this.data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
