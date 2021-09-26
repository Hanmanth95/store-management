import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { UserService } from "src/app/user.service";
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.css"],
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "password", "edit"];
  dataSource: any = [];

  registerFormData = {
    name: "",
    email: "",
    password: "",
  };
  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.getAllSubUsersData();
  }
  getAllSubUsersData() {
    this.userService.getAllSubUsers().subscribe((res: any) => {
      this.dataSource = res;
    });
  }

  register(f: NgForm) {
    if (!f.valid) {
      return;
    }
    this.userService.createSubUser(f.value).subscribe((res: any) => {
      if (res && res.status == "SUCCESS") {
        this.getAllSubUsersData();
        f.resetForm();
      } else {
      }
    });
  }

  openDialog(userData): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: "500px",
      data: userData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.oldEmail = userData.email;
        this.userService.updateSubUsers(result).subscribe((res: any) => {
          if (res && res.status == "SUCCESS") {
            this.getAllSubUsersData();
          }
        });
      }
    });
  }
}
