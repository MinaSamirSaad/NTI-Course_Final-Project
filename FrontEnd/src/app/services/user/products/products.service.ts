import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:5000/api/products/"
  allProducts():Observable<any>{
    return this.http.get(`${this.baseUrl}`  )

  }
  showSingle(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}${id}`  )
  }
  edit(id:string,data:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}${id}`,data  )
  }
  deleteProduct(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}${id}`  )
  }
  addProduct(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}add` ,data )
  }
}
