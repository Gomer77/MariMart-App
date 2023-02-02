import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductsService, private cartService:CartService,
    private toastr: ToastrService, private auth:AuthService,
    private router: Router){}

  productList: any
  userId: any
  cartData: any
  userCartData: any


  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.productList = res
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price})
      })
    })
  }

  addToCart(item: any){
    this.userId = sessionStorage.getItem('username');
    if(this.auth.isLoggedIn()){
      this.toastr.success("Added to cart")
      this.cartService.addToCart(item)
    }else{
      this.router.navigate(['/login'])
    }
  }

  // addToCart(item:any){
  //   this.userId = sessionStorage.getItem('username');
  //   if(this.auth.isLoggedIn()){
  //     this.allCartData()
  //     for(let i = 0; i < this.cartData.length;i++){
  //       if(this.cartData[i].id === this.userId){
  //         this.userCartData.push(this.cartData[i])
  //       }else{
  //         //create a new cart for user
  //         let newCart = {
  //           id: this.cartData.length+1,
  //           user_Id: this.userId,
  //           name: item.name,
  //           description: item.description,
  //           price: item.price,
  //           image: item.image,
  //           weight: item.weight,
  //           quantity: 1,
  //           status: '',
  //           total: item.total
  //         }
  //         this.cartService.postCart(newCart).subscribe({
  //           next: (data) => {},
  //           error:(err) => {
  //             console.log(err)
  //           }
  //         })
  //       }
  //     }
  //     this.toastr.success("Added to cart")
  //     this.cartService.addToCart(item)
  //   }else{
  //     this.router.navigate(['/login'])
  //   }
  //   // console.log(item)
  // }

  allCartData(){
    this.cartService.getCart().subscribe({
      next:(data) => {
        this.cartData = data
      },
      error:(err) => {
        console.log(err)
      }
    })
  }
}
