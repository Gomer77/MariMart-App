import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl='http://localhost:3000/cart'
  productList = new BehaviorSubject<any>([])
  cartItemList:any =[]

  constructor(private http: HttpClient) { }

  postCart(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  getCart() {
    return this.http.get<any>(this.apiUrl);
  }

  putCart(data: any, id: number) {
    return this.http.put<any>(this.apiUrl+`/${id}`, data);
  }

  deleteCart(id: number) {
    return this.http.delete<any>(this.apiUrl+`/${id}`);
  }

  getProduct(){
    return this.productList.asObservable()
  }

  addToCart(product:any){
    this.cartItemList.push(product)
    this.productList.next(this.cartItemList)
    this.getTotalPrice()
  }

  getTotalPrice():number{
    let grandTotal = 0
    this.cartItemList.map((a:any) => {
      grandTotal += a.total
      // console.log(grandTotal)
    })
    return grandTotal
  }

  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList)
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id == a.id) {
        this.cartItemList.splice(index, 1)
      }
    })
    this.productList.next(this.cartItemList)
  }

  addQuantity(product: any) {
    this.cartItemList.map((a: any) => {
      if (product.id == a.id) {
        a.quantity + 1
      }
    })
    this.productList.next(this.cartItemList)
  }

  reduceQuantity(product: any) {
    this.cartItemList.map((a: any) => {
      if (product.id == a.id) {
        if (a.quantity == 1) {
          this.removeCartItem(a)
        } else {
          a.quantity - 1
        }
      }
    })
    this.productList.next(this.cartItemList)
  }
}
