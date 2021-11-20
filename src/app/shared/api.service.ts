import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{map} from 'rxjs/operators'

const baseURL = 'http://localhost:3000/posts/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmploye(data: any) {
    return this.http.post<any>(baseURL, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEmploye() {
    return this.http.get<any>(baseURL)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmploye(data: any, id: number) {
    return this.http.put<any>(baseURL+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmploye(id: number) {
    return this.http.delete<any>(baseURL+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
