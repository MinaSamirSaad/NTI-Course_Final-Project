import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from 'src/app/services/user/restaurants/restaurants.service';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.component.html',
  styleUrls: ['./single-restaurant.component.css']
})
export class SingleRestaurantComponent {
  restaurantData:any={}
  products =[]
  owner=false
constructor(restaurant:RestaurantsService,private _activatedRoute : ActivatedRoute ,router:Router){
  this._activatedRoute.paramMap.subscribe(params => { 
    let id = params.get('singleRestaurantId')
    if(id){
    restaurant.showSingle(id||'').subscribe((res)=>{
      this.restaurantData= res.data
      console.log(res.data)
    },(e)=>{
      console.log(e)
    })}
    else{

      id=JSON.parse(localStorage.getItem('user')||'').restaurant
      this.owner=true
      restaurant.showSingle(id||'').subscribe((res)=>{
        this.restaurantData= res.data
      },(e)=>{
        console.log(e)
      })}
    restaurant.products(id||'').subscribe((res)=>{
      console.log(res)
      this.products = res.data
    },(e)=>{
      console.log(e);
      
    })
});
  
}
}
