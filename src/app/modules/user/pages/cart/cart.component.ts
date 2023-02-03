import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserCartService } from 'src/app/shared/services/user-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'image', 'description', 'price', 'quantity', 'total', 'delete']
  public productsList: any
  public grandTotal: number = 0
  @ViewChild(MatSort) sort !: MatSort
  constructor(private router: Router, private route: ActivatedRoute,
    private cartService: CartService, private toastr: ToastrService,
    private userCartService: UserCartService, private changeDetectorRefs: ChangeDetectorRef) {
  }

  shopMore(): void {
    this.router.navigate(['products'])
  }

  checkout(): void {
    this.router.navigate(['user/checkout'])
  }

  ngOnInit(): void {
    this.setCartDetails();
  }

  setCartDetails() {
    this.userCartService.getUserCart().subscribe((data: any) => {
      this.productsList = data;
      this.grandTotal = data.grandTotal;
      console.log(this.productsList)
      this.productsList.sort = this.sort
      this.changeDetectorRefs.detectChanges()
    })
  }

  emptyCart() {
    this.cartService.emptyCart();
    this.setCartDetails();
  }

  delete(item: any) {
    this.toastr.warning("Item Removed from Cart")
    this.cartService.removeCartItem(item);
    if (item.quantity === 0) {
      item.quantity = 1;
      item.total = item.quantity * item.price;
    }
    this.setCartDetails();
  }

  addQuantity(item: any) {
    this.cartService.addToCart(item);
    this.setCartDetails();
  }

  reduceQuantity(item: any) {
    if (item.itemQuantity === 1) {
      this.delete(item);
    } else {
      this.cartService.minusToCart(item);
    }
    this.setCartDetails();
  }

  updateQuantity(item: any) {
    if (item.itemQuantity <= 0) {
      this.delete(item);
    } else {
      this.userCartService.getUserCart().subscribe((data: any) => {
        let x = data;
        x.cartTotalQuantity = 0;
        x.grandTotal = 0;
        data.orders.map((a: any) => {
          if (a.id === item.id) {
            let cartOrder = a;
            cartOrder.itemTotalPrice = cartOrder.itemQuantity * cartOrder.price;
            x.orders.splice(x.orders.indexOf(a), 1, cartOrder);
          }
          x.cartTotalQuantity += a.itemQuantity;
          x.grandTotal += a.itemTotalPrice;
        })
      })
      this.setCartDetails();
    }
  }
}
