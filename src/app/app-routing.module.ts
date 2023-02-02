import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { LoginComponent } from './shared/login/login.component';
import { AboutPageComponent } from './shared/about-page/about-page.component';
import { ContactPageComponent } from './shared/contact-page/contact-page.component';
import { ProductsComponent } from './shared/products/products.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about-page', component: AboutPageComponent},
  {path: 'contact-page', component: ContactPageComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'user', loadChildren: () =>import('./modules/user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
