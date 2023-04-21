import { Component } from '@angular/core';
import { RestaurantsService } from 'src/app/services/user/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  restaurants=[]
constructor(private restaurant:RestaurantsService){
  restaurant.showAll().subscribe((res)=>{
    this.restaurants= res.data
  })
}
}
