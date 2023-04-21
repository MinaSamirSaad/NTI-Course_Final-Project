import { Component } from '@angular/core';
import { UserDataService } from './services/user/userData/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private user:UserDataService){
    let token = localStorage.getItem('token')
    console.log(token)
    if(token){
      user.isLogin = true
    }
    user.user().subscribe((res)=>{
      localStorage.setItem('user', JSON.stringify(res.data))
    },(e)=>{
      console.log(e.error.message)
    })
  }
}
