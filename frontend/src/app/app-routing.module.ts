import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MyOrdersComponent } from './pages/user/my-orders/my-orders.component';
import { MyCartComponent } from './pages/user/my-cart/my-cart.component';
import { MyProfileComponent } from './pages/user/my-profile/my-profile.component';
import { PaymentComponent } from './pages/user/payment/payment.component';
import { UserFeedbackComponent } from './pages/user/user-feedback/user-feedback.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'orders', component: MyOrdersComponent },
  { path: 'cart', component: MyCartComponent },
  { path: 'profile', component: MyProfileComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'feedback', component: UserFeedbackComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user/items',
    loadChildren: () =>
      import('./pages/user/user-item/user-item.module').then(
        (m) => m.UserItemModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
