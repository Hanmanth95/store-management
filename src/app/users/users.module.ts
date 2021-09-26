import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { ListUsersComponent } from "./list-users/list-users.component";
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatTabsModule,
} from "@angular/material";
import { FormsModule } from "@angular/forms";
import { EditUserDialogComponent } from "./edit-user-dialog/edit-user-dialog.component";

@NgModule({
  declarations: [ListUsersComponent, EditUserDialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
  ],

  entryComponents: [EditUserDialogComponent],
})
export class UsersModule {}
