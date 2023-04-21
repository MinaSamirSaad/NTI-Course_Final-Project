import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdmenService } from 'src/app/services/Admen/admen.service';
import { UserDataService } from 'src/app/services/user/userData/user-data.service';

@Component({
  selector: 'app-login-admen',
  templateUrl: './login-admen.component.html',
  styleUrls: ['./login-admen.component.css']
})
export class LoginAdmenComponent {
  msgError=''
  constructor(private admen:AdmenService,private router : Router,private user:UserDataService){
    admen.isAdmen=true
    localStorage.removeItem('token')
    localStorage.removeItem('admen')
    localStorage.removeItem('user')
    user.isLogin=false
  }
  loginForm = new FormGroup({
    email : new FormControl('' ,
     [Validators.required , Validators.email , Validators.minLength(10)]), // Validators.pattern()
    password: new FormControl('' , [Validators.required])
  })

  isSubmit = false

  get userEmail(){return this.loginForm.get('email')}
  get userPassword(){return this.loginForm.get('password')}

  get userData(){return this.loginForm.controls}



  handleSubmit(){
    console.log(this.loginForm)
    this.isSubmit = true
    if(this.loginForm.valid){
      this.admen.logIn(this.loginForm.value).subscribe(res=>{
        console.log(res)
        if(res.apiStatus) { 
          localStorage.setItem('token' , res.data.token)
          localStorage.setItem('admen',JSON.stringify(res.data.user))
          this.router.navigateByUrl('/ADMEN/Home')
        }
      },(e)=>{
        this.msgError=e.data.message
      })
    }
  }
}
