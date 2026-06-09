import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { MyOrdersComponent } from './pages/user/my-orders/my-orders.component';
import { MyCartComponent } from './pages/user/my-cart/my-cart.component';
import { MyProfileComponent } from './pages/user/my-profile/my-profile.component';
import { PaymentComponent } from './pages/user/payment/payment.component';
import { UserFeedbackComponent } from './pages/user/user-feedback/user-feedback.component';
import { AppRoutingModule } from './app-routing.module';

// ✅ DO NOT import admin components here - they are lazy loaded

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    MyOrdersComponent,
    MyCartComponent,
    MyProfileComponent,
    PaymentComponent,
    UserFeedbackComponent,
    // ❌ REMOVE all admin components from here
    // AddProductComponent,
    // AdminHomeComponent,
    // SalesComponent,
    // AnnouncementComponent,
    // FeedbackComponent,
    // ManageProductsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
