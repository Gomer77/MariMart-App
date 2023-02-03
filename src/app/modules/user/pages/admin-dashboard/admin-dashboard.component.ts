import {  Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  displayedColumns: string[] = ['id', 'name', 'image', 'description', 'price', 'itemsSold']
  public productsList: any
  public grandTotal: number = 0
  @ViewChild(MatSort) sort !: MatSort
  constructor(private router: Router, private productService: ProductsService) {
  }

  shopMore(): void {
    this.router.navigate(['products'])
  }

  checkout(): void {
    this.router.navigate(['user/checkout'])
  }

  ngOnInit(): void {
    this.setProductData();
  }

  setProductData() {
    this.productService.getProducts().subscribe(data => {
      this.productsList = data
    })
  }
}
