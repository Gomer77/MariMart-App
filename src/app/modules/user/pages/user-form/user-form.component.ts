import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  editData : any
  userId:any

  constructor(private formBuilder: FormBuilder, private auth : AuthService,
    private dialogRef : MatDialogRef<UserFormComponent>,@Inject(MAT_DIALOG_DATA)
    public data: any){  }

  ngOnInit(): void {
      this.userId = sessionStorage.getItem('username');
      this.auth.getProfile(this.userId).subscribe(res => {
        this.editData = res
        this.editForm.setValue({
          userName: this.editData.id,
          passWord: this.editData.password,
          eMail: this.editData.email,
          mobileNumber: this.editData.number,
          })
      })
  }

    editForm = this.formBuilder.group({
    userName:this.formBuilder.control(''),
    passWord:this.formBuilder.control(''),
    eMail:this.formBuilder.control(''),
    mobileNumber:this.formBuilder.control(''),
  })

  updateProfile(){
    this.auth.putProfile(this.editForm.value,this.editData.id)
    .subscribe({
      next:(res) =>{
        alert("Profile updated successfully")
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("Error updating")
      }
    })
  }
}
