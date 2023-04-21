import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmenService {

  constructor(private http : HttpClient) { }
  baseUrl = "http://localhost:5000/api/Admen/"
  isAdmen = false
  logIn(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}login` , data)
  }
  allUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}users` )
  }
  allProducts():Observable<any>{
    return this.http.get(`${this.baseUrl}products` , )
  }
  allRestaurants():Observable<any>{
    return this.http.get(`${this.baseUrl}restaurants`  )
  }
  allOrders():Observable<any>{
    return this.http.get(`${this.baseUrl}orders` )
  }
  deleteUser(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}users/${id}` )
  }
  deleteRestaurant(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}restaurants/${id}` )
  }
  deleteOrder(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}orders/${id}` )
  }
  deleteProduct(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}products/${id}` )
  }
}
