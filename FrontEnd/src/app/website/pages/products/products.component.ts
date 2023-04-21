import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/user/orders/orders.service';
import { ProductsService } from 'src/app/services/user/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  message=''
  allProducts=[]
  constructor(private products:ProductsService){
    products.allProducts().subscribe((res)=>{
      this.allProducts= res.data
    },(e)=>{
      console.log(e);
      this.message=e.data.message
    })
  }

}
