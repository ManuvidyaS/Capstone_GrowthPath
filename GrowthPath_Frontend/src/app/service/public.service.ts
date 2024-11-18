import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({

 providedIn: 'root'

})

export class PublicService {

 private apiUrl = 'http://localhost:7777/public-api/courses-v1'; // Replace with your JSON data URL


 constructor(private http: HttpClient) {}


 getCourses(): Observable<any> {

   return this.http.get<any>(this.apiUrl);

 }

}