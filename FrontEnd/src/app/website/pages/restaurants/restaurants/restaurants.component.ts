import { Component } from '@angular/core';
import { RestaurantsService } from 'src/app/services/user/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  message=''
  restaurants=[]
constructor(private restaurant:RestaurantsService){
  restaurant.showAll().subscribe((res)=>{
    this.restaurants= res.data
  },e=>{
    this.message=e.data.message
  })
}
}
