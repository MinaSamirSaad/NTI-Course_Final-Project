import { Component, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user/userData/user-data.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  userData:any = {}
  constructor(user:UserDataService){
    user.user().subscribe((res)=>{
      this.userData = res.data
    })
  }
}
