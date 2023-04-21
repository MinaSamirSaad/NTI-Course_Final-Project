import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantsService } from 'src/app/services/user/restaurants/restaurants.service';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent {
  msgError=''
  restaurantData:any={
    title:'',
    details:'',
    image:{}||''
  }
  img='https://cdn.pixabay.com/photo/2017/10/08/19/55/magnifying-glass-2831367__340.png'
  token = localStorage.getItem('token')
  user:any = localStorage.getItem('user')
  createNewOne = false
  constructor(private restaurant:RestaurantsService, private router : Router ){
    if( this.token && JSON.parse(this.user).userType==='Owner' && !JSON.parse(this.user).restaurant ){
      this.createNewOne=true
    }
    if(this.token && JSON.parse(this.user).userType=='Owner' && JSON.parse(this.user).restaurant ){
      this.createNewOne=false
      restaurant.showSingle(JSON.parse(this.user).restaurant).subscribe((res)=>{
        this.restaurantData=res.data
        this.img=res.data.image
      })
    }
  }
  handleChange(eve :any){
    this.restaurantData.image = eve.target.files[0]
    this.img = URL.createObjectURL(eve.target.files[0]);
   
    
  }
  handleSubmit =(form : NgForm)=>{
if(form.valid){
      let formData = new FormData()
      formData.append('image' , this.restaurantData.image)
      formData.append('title', this.restaurantData.title)
      formData.append('details' , this.restaurantData.details)
      if(this.createNewOne){
      this.restaurant.addNewRestaurant(formData).subscribe( res=>{
        const user = localStorage.getItem('user')
        JSON.parse(user||'').restaurant = res.data._id  
        localStorage.setItem('user', JSON.stringify(user))
        this.router.navigateByUrl('/restaurants')
      },(e)=>{
        console.log(e.error);
        this.msgError=e.error.message
      })
    
  }
  else{
    this.restaurant.edit(JSON.parse(this.user).restaurant,formData).subscribe((res)=>{
      console.log(res)
      if(form.valid){
      this.router.navigateByUrl('/restaurants')
      }
    })
  }
}
  }


}
