import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserRoutingModule } from './user-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { UpdateDialogComponent } from './pages/update-dialog/update-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import { CategoryfilterPipe } from './pipe/categoryfilter.pipe';




@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    PendingOrdersComponent,
    UserProfileComponent,
    UserFormComponent,
    AdminPageComponent,
    ProductsPageComponent,
    UpdateDialogComponent,
    AdminDashboardComponent,
    CategoryfilterPipe
  ],
  imports: [
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatGridListModule,
    MatSortModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
  ]
})
export class UserModule { }
