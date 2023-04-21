import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/user/orders/orders.service';
import { ProductsService } from 'src/app/services/user/products/products.service';
import { UserDataService } from 'src/app/services/user/userData/user-data.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
orders:any=[]
constructor(user:UserDataService,product:ProductsService,private order:OrdersService,private router:Router){
  user.myOrders().subscribe((res)=>{
    for(let order of res.data){
      product.showSingle(order.productId).subscribe((res)=>{
        this.orders.push({orderId:order._id,...res.data})
      })
    }
    console.log(this.orders)
  })
}
handleDelete(id:string){
  this.order.deleteOrder(id).subscribe((res)=>{

      this.router.navigateByUrl('/products', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/orders']),3000
    })

  },(e)=>{
    console.log(e)
  })
}
}
