import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  apiUrl='http://localhost:3000'
  public userCartDetails: any = this.getCartFromLocalStorage();
  public userCartDetailsSubject = new BehaviorSubject<any>(this.userCartDetails)
  public userCartQuantity: any = this. getCartFromLocalStoragecartTotalItem();
  public userCartQuantitySubject = new BehaviorSubject<any>(this.userCartQuantity)
  public userDetails: any = this.getUserFromLocalStorage();
  public userDetailsSubject = new BehaviorSubject<any>(this.userDetails)

  constructor(private http: HttpClient) {

  }

  createCart(username: string){
    let cartDetail = {
      id: 0,
      username: username,
      orders:[

      ],
      cartTotalQuantity: 0,
      grandTotal: 0,
    }
    this.http.post<any>(this.apiUrl+'/cart' , cartDetail).subscribe(res => {
      console.log(res)}, err=>{alert("Something went wrong!")
    });
  }

  loadUserCart(username:string){
    this.http.get<any>(this.apiUrl+'/cart').subscribe(res => {
      for(let x of res){
        if(x.username === username){
          this.userCartDetails = {
            id: x.id,
            username: x.username,
            orders: x.orders,
            cartTotalQuantity: x.cartTotalQuantity,
            grandTotal: x.grandTotal
          }
          this.userCartDetailsSubject.next(this.userCartDetails);
          this.userCartQuantitySubject.next(this.userCartDetails.cartTotalQuantity);
          const cartJson = JSON.stringify(this.userCartDetails);
          localStorage.setItem('Cart', cartJson)
          const cartTotalItem = JSON.stringify(this.userCartDetails.cartTotalQuantity);
          localStorage.setItem('CartTotalItem', cartTotalItem)
        }
      }
    })
  }

  loadUserDetails(username:string){
    this.http.get<any>(this.apiUrl+'/user').subscribe(res => {
      for(let x of res){
        if(x.name === username){
          this.userDetails = {
            id: x.id,
            name: x.username,
            password: x.password,
            email: x.email,
            number: x.number,
            role : x.role,
            status : x.status
          }
          this.userDetailsSubject.next(this.userDetails);
          const userJson = JSON.stringify(this.userDetails);
          localStorage.setItem('User', userJson)
        }
      }
    })
  }

  getUserCart(){
    return this.userCartDetailsSubject.asObservable();
  }

  getUserDetails(){
    return this.userDetailsSubject.asObservable();
  }
  getUserFromLocalStorage() {
    const userJson = localStorage.getItem('User');
    return userJson? JSON.parse(userJson): [];
  }

  getUserCartQuantity(){
    return this.userCartQuantitySubject.asObservable();
  }

  getCartFromLocalStorage(){
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : [];
  }

  getCartFromLocalStoragecartTotalItem(){
    const cartTotalItem = localStorage.getItem('CartTotalItem');
    return cartTotalItem? JSON.parse(cartTotalItem) : [];
  }
}
