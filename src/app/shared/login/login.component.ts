import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCartService } from '../services/user-cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private auth: AuthService, private router: Router, private route: ActivatedRoute,
    private userCartService:UserCartService) {
      sessionStorage.clear()
    }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    })
  }

    userData: any

    proceedLogin(){
      const cartName = this.loginForm.value.username;
      if(this.loginForm.valid){
        this.auth.getByCode(this.loginForm.value.username).subscribe(data => {
          this.userData = data
          console.log(this.userData)
          if(this.userData.password === this.loginForm.value.password){
            if(this.userData.status){
              sessionStorage.setItem('username', this.userData.id)
              sessionStorage.setItem('role', this.userData.role)
              if(this.userData.role === 'customer'){
                this.userCartService.loadUserCart(cartName)
                this.userCartService.loadUserDetails(cartName)
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
