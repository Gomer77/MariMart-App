import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CartComponent } from './pages/cart/cart.component';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path: 'cart', component: CartComponent, canActivate:[AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuard]},
  {path: 'pending-orders', component: PendingOrdersComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate:[AuthGuard]},
  {path: 'products-page', component: ProductsPageComponent, canActivate:[AuthGuard]},
  {path: 'admin-page', component: AdminPageComponent, canActivate:[AuthGuard]},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate:[AuthGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class UserRoutingModule { }
