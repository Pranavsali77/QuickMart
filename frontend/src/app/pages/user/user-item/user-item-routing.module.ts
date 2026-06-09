import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAllItemsComponent } from './components/view-all-items/view-all-items.component';
import { ViewItemDetailsComponent } from './components/view-item-details/view-item-details.component';

const routes: Routes = [
  { path: '', component: ViewAllItemsComponent },
  { path: 'details/:id', component: ViewItemDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserItemRoutingModule {}
