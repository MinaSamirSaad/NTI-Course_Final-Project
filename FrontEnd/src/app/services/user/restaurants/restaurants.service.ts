import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:5000/api/restaurant/"
  addNewRestaurant(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}add` ,data )

  }
  showAll():Observable<any>{
    return this.http.get(`${this.baseUrl}`)

  }
  showSingle(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}${id}`  )
  }
  edit(id:string,data:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}${id}`,data  )
  }
  products(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}products/${id}`  )
  }
  orders(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}orders/${id}`  )
  }
}
