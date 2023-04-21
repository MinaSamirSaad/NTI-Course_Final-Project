import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './website/pages/home/home.component';
import { ProductsComponent } from './website/pages/products/products.component';
import { SingleProductComponent } from './website/pages/single-product/single-product.component';
import { RestaurantsComponent } from './website/pages/restaurants/restaurants/restaurants.component';
import { RegisterComponent } from './website/pages/register/register/register.component';
import { CreateRestaurantComponent } from './website/pages/createRestaurant/create-restaurant/create-restaurant.component';
import { SingleRestaurantComponent } from './website/pages/singleRestaurant/single-restaurant/single-restaurant.component';
import { MyProfileComponent } from './website/pages/myProfile/my-profile/my-profile.component';
import { MyOrdersComponent } from './website/pages/myOrders/my-orders/my-orders.component';
import { LoginComponent } from './website/pages/logIn/login/login.component';
import { CreateProductComponent } from './website/pages/createProduct/create-product/create-product.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginAdmenComponent } from './Dashboard/login-admen/login-admen.component';
import { AdmenHomeComponent } from './Dashboard/admen-home/admen-home.component';

const routes: Routes = [
  {path:'' , children:[
  {path:'' , component:HomeComponent},
  {path:'profile' , component:MyProfileComponent},
  {path:'register' , component:RegisterComponent},
  {path:'login' , component:LoginComponent},
  {path:'addProduct' , component:CreateProductComponent},
  {path:'addProduct/:singleOrderId' , component:CreateProductComponent},
  {path:'orders' , component:MyOrdersComponent},
  {path:'myRestaurant' , component:SingleRestaurantComponent},
  {path:'createRestaurant',component:CreateRestaurantComponent},
  {path:'products' , children:[
    {path:'' , component : ProductsComponent },
    {path:':singleProductId' , component :SingleProductComponent  }
    // {path:'addPost' , component : AddPostComponent },
  ]},
  {path:'restaurants' , children:[
    {path:'' , component : RestaurantsComponent },
    {path:":singleRestaurantId" , component :SingleRestaurantComponent  }
  ]}
]},{path:'ADMEN' , children:[
  {path:'' , component:LoginAdmenComponent},
  {path:'Home' , component:AdmenHomeComponent},
]},
{ path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
