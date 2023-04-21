import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http : HttpClient) { 
  }
  baseUrl = "http://localhost:5000/api/orders/"
  showSingle(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}${id}`  )
  }
  edit(id:string,data:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}${id}`,data  )
  }
  deleteOrder(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}${id}`  )
  }
  addOrder(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}add/${id}`,{} )
  }
}
