import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SalesComponent } from './sales/sales.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';

// ❌ Remove this import
// import { AdminChatComponent } from './admin-chat/admin-chat.component';

const routes: Routes = [
  { path: '', component: AdminHomeComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'announcement', component: AnnouncementComponent },
  { path: 'feedback', component: FeedbackComponent },
  // ❌ Remove this route
  // { path: 'chat', component: AdminChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
