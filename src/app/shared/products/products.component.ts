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

  minPrice = 0
  maxPrice = 0
  productList: any
  searchKey: string = ""
  filterByCategory: any
  sortByParam = ''
  sortByOrder = 'asc'
  filterByPriceList: any


  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.productList = res
      this.filterByCategory = res
    })

    this.cartService.search.subscribe((res:any) => {
      this.searchKey = res
    })
  }

  filter(category:string){
    this.filterByCategory = this.productList.filter((a:any) => {
      if(a.category === category || a.category === ''){
        return a
      }
    })
  }

  resetFilterByPrice(){
    this.minPrice = 0;
    this.maxPrice = 0;
  }

  addToCart(item: any){
    if(this.auth.isLoggedIn()){
      this.toastr.success("Added to cart")
      this.cartService.addToCart(item)
    }else{
      this.router.navigate(['/login'])
    }
  }
}
