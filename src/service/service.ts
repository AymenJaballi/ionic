import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;

@Injectable({providedIn: 'root'})


export class News {
constructor ( private http: HttpClient ) {

}
 getNews() {
   return   this.http.get('https://api.myjson.com/bins/eqegw') ;
}
getNewsLilmit(start: number , end: number ) {
    return   this.http.get('https://api.myjson.com/bins/eqegw?_start=' + start + '&_limit=' + end) ;
 }

 getLogin() {
     return this.http.get('http://localhost:3000/login') ;
 }

}
