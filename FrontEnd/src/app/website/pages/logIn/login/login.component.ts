import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginData } from 'src/app/interfaces/user-login-data';
import { UserDataService } from 'src/app/services/user/userData/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData:UserLoginData={
    email:'',
    password:'',
  }
  msgError = null
  constructor(private user : UserDataService , private router : Router){}
  handleSubmit(form : NgForm){
    if(form.valid){
      this.user.logIn(this.userData).subscribe(res=>{
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        this.user.isLogin = true
      this.router.navigateByUrl('/')
      }, (e)=>{
        console.log(e.error.message)
        this.msgError = e.error
      })
    }
  }
}
