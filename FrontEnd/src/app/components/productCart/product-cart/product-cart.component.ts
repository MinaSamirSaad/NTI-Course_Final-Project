import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/user/orders/orders.service';
import { ProductsService } from 'src/app/services/user/products/products.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
@Input() data:any;
@Input() owner:boolean | undefined
constructor(private orders:OrdersService,private router:Router,private product:ProductsService){
}
added=false
handleSubmit(id:string){
  if(localStorage.getItem('token')){
  this.orders.addOrder(id).subscribe((res)=>{
    console.log(res.data)
    this.added=true
  },(e)=>{
    console.log(e);
    
  })
}
else{
this.router.navigateByUrl('/register')
}
}
handleDelete(id:string){
this.product.deleteProduct(id).subscribe((res)=>{
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/myRestaurant']),3000
})
})
}
}
