import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private auth: AuthService, private router: Router ){}

  registrationForm = this.builder.group({
    id:this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.compose([Validators.required, Validators.minLength(6)])),
    email:this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    number:this.builder.control('', Validators.compose([Validators.required, Validators.minLength(11)])),
    role: this.builder.control(''),
    status:this.builder.control(false)
  })

  proceedRegistration(){
    if(this.registrationForm.valid){
      this.auth.proceedRegistration(this.registrationForm.value).subscribe(data => {
        this.toastr.success('Please wait for admin to enable access','Registered Successfully')
        this.router.navigate(['login'])
      })
    }else{
      this.toastr.warning('Please enter valid data')
    }
  }
}
