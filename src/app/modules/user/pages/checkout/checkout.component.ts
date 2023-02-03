import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UserCartService } from 'src/app/shared/services/user-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
displayedColumns: string[] = ['id','name','image','price','quantity','total']
  public productsList :any
  public grandTotal : number = 0;
  @ViewChild(MatSort) sort !:MatSort
  constructor(private router: Router, private userCartService: UserCartService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setCartDetails();
  }

  shopMore(): void {
    this.router.navigate(['products'])
  }

  placeOrder(){
    this.router.navigate(['user/pending-orders']);
  }

  setCartDetails(){
    this.userCartService.getUserCart().subscribe((data:any) => {
      this.productsList = data;
      this.grandTotal = data.grandTotal;
      console.log(this.productsList)
      this.productsList.sort = this.sort
      this.changeDetectorRefs.detectChanges()
    })
  }
}
