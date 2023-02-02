import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private auth: AuthService, private router: Router, private route: ActivatedRoute) {
      sessionStorage.clear()
    }

    userData: any

    loginForm = this.builder.group({
      username: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    })

    proceedLogin(){
      if(this.loginForm.valid){
    //     this.auth.proceedRegistration(this.loginForm.value).subscribe(data => {
    //       this.toastr.success('Please wait for admin to enable access','Registered Successfully')
    //       this.router.navigate(['login'])
    //     })
    //   }else{
    //     this.toastr.warning('Please enter valid data')
        this.auth.getByCode(this.loginForm.value.username).subscribe(data => {
          this.userData = data
          console.log(this.userData)
          if(this.userData.password === this.loginForm.value.password){
            if(this.userData.status){
              sessionStorage.setItem('username', this.userData.id)
              sessionStorage.setItem('role', this.userData.role)
              if(this.userData.role === 'customer'){
                this.router.navigate(['products']);
              }else{
                this.router.navigate(['user/admin-dashboard']);
              }
            }else{
              this.toastr.error('Please contact admin','Inactive Account')
            }
          }else{
            this.toastr.error('Invalid Username or Password')
          }
        })
      }
    }
}
