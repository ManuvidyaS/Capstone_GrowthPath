import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';


@Injectable({

 providedIn: 'root'

})

export class AssignmentService {

 private apiUrl = 'http://localhost:7777/learning-api'; // Assignment API base URL

 private baseUrl = 'http://localhost:7777/auth-api/employees'; // Auth API base URL for employees

 private assignUrl='http://localhost:7777/assignment-api/assign-course';

 constructor(private http: HttpClient) {}


 // Fetch all courses

 getCourses(): Observable<any> {

   return this.http.get(`${this.apiUrl}/course`); // Endpoint for getting courses

 }


 // Fetch all employees

 getEmployees(): Observable<any> {

   return this.http.get(`${this.baseUrl}`); // Endpoint for getting employees (auth API)

 }


 // Assign a course to an employee

 assignCourseToEmployee(payload: any): Observable<any> {

   return this.http.post<any>(this.assignUrl, payload).pipe(

     catchError(error => {

       console.error('Error in course assignment:', error);

       return throwError(() => new Error('Failed to assign course.'));

     })

   );

 }


}