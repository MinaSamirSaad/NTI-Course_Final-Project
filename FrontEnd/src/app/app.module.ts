import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './website/pages/home/home.component';
import { ProductsComponent } from './website/pages/products/products.component';
import { SingleProductComponent } from './website/pages/single-product/single-product.component';
import { HeaderComponent } from './website/shared/header/header.component';
import { RestaurantsComponent } from './website/pages/restaurants/restaurants/restaurants.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart/cart.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { RegisterComponent } from './website/pages/register/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRestaurantComponent } from './website/pages/createRestaurant/create-restaurant/create-restaurant.component';
import { AvatarComponent } from './components/avatar/avatar/avatar.component';
import { SingleRestaurantComponent } from './website/pages/singleRestaurant/single-restaurant/single-restaurant.component';
import { ProductCartComponent } from './components/productCart/product-cart/product-cart.component';
import { RestaurantCartComponent } from './components/restaurantCart/restaurant-cart/restaurant-cart.component';
import { MyOrdersComponent } from './website/pages/myOrders/my-orders/my-orders.component';
import { MyProfileComponent } from './website/pages/myProfile/my-profile/my-profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './website/pages/logIn/login/login.component';
import { CreateProductComponent } from './website/pages/createProduct/create-product/create-product.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginAdmenComponent } from './Dashboard/login-admen/login-admen.component';
import { AdmenHomeComponent } from './Dashboard/admen-home/admen-home.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    SingleProductComponent,
    HeaderComponent,
    RestaurantsComponent,
    SingleRestaurantComponent,
    CartComponent,
    RegisterComponent,
    CreateRestaurantComponent,
    AvatarComponent,
    ProductCartComponent,
    RestaurantCartComponent,
    MyOrdersComponent,
    MyProfileComponent,
    LoginComponent,
    CreateProductComponent,
    ErrorPageComponent,
    LoginAdmenComponent,
    AdmenHomeComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // required animations module
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor, 
     multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
