import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAllItemsComponent } from './components/view-all-items/view-all-items.component';
import { ViewItemDetailsComponent } from './components/view-item-details/view-item-details.component';
import { UserItemRoutingModule } from './user-item-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewAllItemsComponent, ViewItemDetailsComponent],
  imports: [CommonModule, HttpClientModule, UserItemRoutingModule, FormsModule],
})
export class UserItemModule {}
