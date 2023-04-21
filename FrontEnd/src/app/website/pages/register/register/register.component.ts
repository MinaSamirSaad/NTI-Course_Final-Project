import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/interfaces/user-data';
import { UserDataService } from 'src/app/services/user/userData/user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData:UserData={
    userName:'',
    email:'',
    age:null,
    password:'',
    address:{
      city:'',
      country:''
    },
    gender:'',
    userType:'',
    image:''
  }
  msgError = null
  constructor(private user : UserDataService , private router : Router){}
  handleSubmit(form : NgForm){
    console.log(this.userData)
    if(form.valid){
      this.user.register(this.userData).subscribe(res=>{
        console.log()
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        this.user.isLogin = true
        if(res.data.user.userType=="User") this.router.navigateByUrl('/')
        else this.router.navigateByUrl('/createRestaurant')

      }, (e)=>{
        console.log(e.error.message)
        this.msgError = e.error
      })
    }
  }
}
