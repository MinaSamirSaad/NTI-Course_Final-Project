import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:5000/api/user/"
  isLogin = false

  logIn(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}login` , data)
  }
  register(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}register` , data)
  }
  uploadPhoto(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}uploadImage` , data)
  }
  logOut():Observable<any>{
    return this.http.post(`${this.baseUrl}logout` , '')
  }
  myProducts():Observable<any>{
    return this.http.get(`${this.baseUrl}products` )
  }
  myOrders():Observable<any>{
    return this.http.get(`${this.baseUrl}orders` )
  }
  myRestaurants():Observable<any>{
    return this.http.get(`${this.baseUrl}restaurant` )
  }
  editProfile(data:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}`,data )
  }
  user():Observable<any>{
    return this.http.get(`${this.baseUrl}` )
  }
}
