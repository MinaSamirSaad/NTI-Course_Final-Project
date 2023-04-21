import { Component } from '@angular/core';
import { UserDataService } from 'src/app/services/user/userData/user-data.service';
import { AdmenService } from '../../../services/Admen/admen.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public user : UserDataService,public admen:AdmenService){

  }

  handleClick(){
    this.user.logOut().subscribe((res)=>{
      localStorage.removeItem('token')
      this.user.isLogin = false
    },(e)=>{
      console.log(e);
      
    })

  }
}
