import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {
  constructor(private builder: FormBuilder, private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any, private toastr: ToastrService,
    private dialog:MatDialogRef<UpdateDialogComponent>){}


  editData:any
  ngOnInit(): void {
    this.auth.getAllRole().subscribe(role => {
      this.roleList = role
    })
    if (this.data.usercode != null && this.data.usercode != '') {
      this.auth.getByCode(this.data.usercode).subscribe(res => {
        this.editData = res
        this.registrationForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          password: this.editData.password,
          email: this.editData.email,
          number: this.editData.number,
          role: this.editData.role,
          status: this.editData.status})
      })
    }
  }

roleList:any

  registrationForm = this.builder.group({
    id:this.builder.control(''),
    name:this.builder.control(''),
    password:this.builder.control(''),
    email:this.builder.control(''),
    number:this.builder.control(''),
    role: this.builder.control('', Validators.required),
    status:this.builder.control(false)
  })
  updateUser(){
    if(this.registrationForm.valid){
      this.auth.updateUser(this.registrationForm.value.id, this.registrationForm.value).subscribe(res => {
        this.toastr.success('Updated')
        this.dialog.close()
      })
    }else{
      this.toastr.warning('Please Select Role')
    }
  }
}
