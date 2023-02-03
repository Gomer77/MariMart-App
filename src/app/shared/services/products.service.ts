import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  apiUrl='http://localhost:3000'

  getProducts(): Observable<any>{
    return this.http.get(this.apiUrl+'/products').pipe(
      map((res:any) => {
        return res
      })
    )
  }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/products" , data)
    .pipe(map((res:any)=>{return res;}))
  }

  updateProduct(data : any , id : number){
    return this.http.put<any>("http://localhost:3000/products/"+id , data)
    .pipe(map((res:any)=>{return res}))
  }

  deleteProduct(id : number){
    return this.http.delete<any>("http://localhost:3000/products/"+id)
    .pipe(map((res:any)=>{return res}))
  }

  updateProducts(id : number, product : any) : Observable<any>{
    return this.http.put<any>(this.apiUrl+`/products/${id}`, product).pipe(map((data:any) => {
      return data;
    }))
  }
}
