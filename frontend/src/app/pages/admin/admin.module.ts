import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SalesComponent } from './sales/sales.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';

// ❌ Remove this import
// import { AdminChatComponent } from './admin-chat/admin-chat.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AddProductComponent,
    SalesComponent,
    AnnouncementComponent,
    FeedbackComponent,
    ManageProductsComponent,
    // ❌ Remove AdminChatComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, AdminRoutingModule],
})
export class AdminModule {}
