import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  firstClick (){
    console.log('first Click clicked****');
  }
  getUsers() {
    return this.http.get('https://reqres.in/api/users')
  }
}
