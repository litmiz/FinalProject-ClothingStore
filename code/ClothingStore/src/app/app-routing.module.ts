import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { CartComponent } from './cart/cart.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { LoginComponent } from './login/login.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'catalog-page/:category', component: CatalogPageComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'item-page/:_id', component: ItemPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-details', component: UserDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'add-items', component: AddItemsComponent},
  {path: 'manage-orders', component: ManageOrdersComponent},
  {path: 'manage-users', component: ManageUsersComponent},
  {path: 'my-orders', component: MyOrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
