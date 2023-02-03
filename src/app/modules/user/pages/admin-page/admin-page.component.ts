import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  constructor(public auth: AuthService, private dialog:MatDialog){
    this.LoadUser()
  }
  userList: any
  dataSource: any
  @ViewChild( MatPaginator) paginator !:MatPaginator
  @ViewChild( MatSort) sort !:MatSort

  LoadUser(){
    this.auth.getAll().subscribe(user => {
      this.userList = user
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];

  updateUser(id:any){
    const dialog = this.dialog.open(UpdateDialogComponent,{
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      width: '50%',
      data:{
        usercode:id
      }
    })
    dialog.afterClosed().subscribe(res => {
      this.LoadUser()
    })
  }

  openDialog(){

  }
}
