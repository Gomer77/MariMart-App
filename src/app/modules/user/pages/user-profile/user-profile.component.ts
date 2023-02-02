import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userName: string = ''
  eMail: string = ''
  mobileNumber : any = ''
  userId : any


  constructor(private dialog: MatDialog, private auth : AuthService){
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('username');
    this.readProfile(this.userId)
  }

  openDialog() {
    this.dialog.open(UserFormComponent, {
      width:'30%',
      data : {id: this.userId}
    }).afterClosed().subscribe(val =>{
      if(val === 'update'){
        this.readProfile(this.userId)
      }
    })
  }

  userList:any
  readProfile(id : any) {
    this.auth.getProfile(id).subscribe(profile => {
      this.userName = profile.name
      this.eMail = profile.email
      this.mobileNumber = profile.number
    })
  }
}
