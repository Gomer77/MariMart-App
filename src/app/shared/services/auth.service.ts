import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiUrl='http://localhost:3000/user'

  getAll(){
    return this.http.get(this.apiUrl)
  }

  getByCode(code:any){
    return this.http.get(this.apiUrl+"/"+code)
  }

  getAllRole(){
    return this.http.get('http://localhost:3000/role')
  }

  proceedRegistration(input:any){
    return this.http.post(this.apiUrl, input)
  }

  updateUser(code:any,input:any){
    return this.http.put(this.apiUrl+"/"+code, input)
  }

  isLoggedIn(){
    return sessionStorage.getItem('username')!=null
  }

  getUserRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():''
  }

  getUserId(){
    return sessionStorage.getItem('id')!=null?sessionStorage.getItem('id')?.toString():''
  }

  postProfile(data : any){
    return this.http.post<any>(this.apiUrl,data)
  }

  putProfile(data : any, id : number){
    return this.http.put<any>(this.apiUrl+`/${id}`,data)
  }

  getProfile(id : number){
    return this.http.get<any>(this.apiUrl+`/${id}`)
  }
}
