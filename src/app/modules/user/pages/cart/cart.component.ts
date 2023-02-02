import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productsList!:any[]
  grandTotal:number = 0
  constructor(private router:Router, private route:ActivatedRoute,
    private cartService:CartService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res => {
      this.productsList = res
      this.grandTotal = this.cartService.getTotalPrice()
    })
  }

  displayedColumns: string[] = ['id','name','image','description','price','quantity','total','delete']

  shopMore(): void {
    this.router.navigate(['products'])
  }

  emptyCart(){
    this.cartService.removeAllCart()
  }

  delete(item:any){
    this.toastr.warning("Item Removed from Cart")
    this.cartService.removeCartItem(item)
  }

  addQuantity(item:any){
    this.cartService.addQuantity(item)
  }

  reduceQuantity(item:any){
    this.cartService.reduceQuantity(item)
  }
}
