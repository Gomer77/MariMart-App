import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  apiUrl='http://localhost:3000/products'

  getProducts(){
    return this.http.get(this.apiUrl).pipe(
      map((res:any) => {
        return res
      })
    )
  }
}
