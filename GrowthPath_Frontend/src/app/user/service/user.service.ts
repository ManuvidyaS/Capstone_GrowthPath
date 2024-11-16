import { Injectable } from '@angular/core';

import { ApiResponse } from '../update-course/update-course.component';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({

 providedIn: 'root'

})

export class UserService {

 private apiUrl = 'http://localhost:7725/api/assignment'; // Update with correct gateway URL

 private assignUrl='http://localhost:7777/assignment-api';


 constructor(private http: HttpClient) {}


 updateCourseProgress(employeeId: string, courseId: number, modulesCompleted: number): Observable<ApiResponse> {

   const body = { employeeId, courseId, modulesCompleted };

   return this.http.post<ApiResponse>(`${this.apiUrl}/update-progress`, body);


 }

 getAssignedCourses(employeeId: string): Observable<any> {

   return this.http.get(`${this.assignUrl}/get-assigned-courses/${employeeId}`);

}

}