import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user/userData/user-data.service';
import { ToastrService } from 'ngx-toastr';
import { UserData } from 'src/app/interfaces/user-data';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
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
    image:{}||""
  }
  added=false
  constructor(private user:UserDataService,private router:Router, private toastr: ToastrService) {
    user.user().subscribe((res)=>{
      this.userData=res.data
      console.log(res.data)
      this.userData.password=''
    })
  }
  handleChange(eve :any){
    const image = eve.target.files[0]
    let formData = new FormData()
     formData.append('image' , image)
    this.user.uploadPhoto(formData).subscribe((res)=>{
    //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['/profile']);
    // }); 
    window.location.reload()
    })
  }
  handleSubmit(form : NgForm){
    if(form.valid){
      this.user.editProfile(this.userData).subscribe((res)=>{
        console.log(res)
        this.added=true
      },(e)=>{
        console.log(e);
        
      })
    }
  }
}
