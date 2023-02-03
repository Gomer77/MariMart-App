import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit{
  opened=false;
  title = 'MariMart-App';
  isMenuRequired = false;
  isAdmin = false;
  totalItems = 0
  constructor(private router:Router, private auth: AuthService,
    private route: ActivatedRoute, private cartService: CartService){
    let role = sessionStorage.getItem('role')
    if(role=='admin' || role=='support'){
      this.isAdmin = true
    }
  }

  ngOnInit(): void {
    const id = sessionStorage.getItem('id')
    this.cartService.getTotalCount().subscribe(res => {
      this.totalItems = res
    })
  }

  ngDoCheck(): void {
    let currentUrl = this.router.url
    if(currentUrl == '/login' || currentUrl == '/register' || this.auth.getUserRole() === ''){
      this.isMenuRequired = false
    }else{
      this.isMenuRequired = true
    }

    if(this.auth.getUserRole() === 'admin' || this.auth.getUserRole() === 'support'){
      this.isAdmin = true
    }else{
      this.isAdmin = false
    }
  }

  openProfile(): void {
    this.router.navigate(['user/profile'], {relativeTo: this.route})
  }

  openCart(): void {
    this.router.navigate(['user/cart'], {relativeTo: this.route})
  }

  openCheckout(): void {
    this.router.navigate(['user/checkout'], {relativeTo: this.route})
  }

  openPendingOrders(): void {
    this.router.navigate(['user/pending-orders'], {relativeTo: this.route})
  }

  openProductsPage(): void {
    this.router.navigate(['user/products-page'], {relativeTo: this.route})
  }

  openAdminPage(): void {
    this.router.navigate(['user/admin-page'], {relativeTo: this.route})
  }

  openHome(): void {
    this.router.navigate([''])
  }

  openProducts(): void {
    this.router.navigate(['products'], {relativeTo: this.route})
  }

  openAbout(): void {
    this.router.navigate(['about-page'], {relativeTo: this.route})
  }

  openContact(): void {
    this.router.navigate(['contact-page'], {relativeTo: this.route})
  }
}
