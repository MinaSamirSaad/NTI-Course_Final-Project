import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-cart',
  templateUrl: './restaurant-cart.component.html',
  styleUrls: ['./restaurant-cart.component.css']
})
export class RestaurantCartComponent {
  @Input() data:any
}
