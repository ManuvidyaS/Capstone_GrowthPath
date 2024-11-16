import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../admin/Models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:7777/learning-api/course'; // LearningAPI through Gateway

 private assignmentApiUrl = 'http://localhost:7777/assignment-api/assign-course'; // Assignment API through Gateway

 constructor(private http: HttpClient) {}

 getCourses(): Observable<any> {

  return this.http.get<any>(`${this.apiUrl}`);

 }

 getCourseById(id: number): Observable<any> {

  return this.http.get<any>(`${this.apiUrl}/${id}`);

 }

 updateCourse(course: Course): Observable<any> {

  return this.http.put(`${this.apiUrl}/${course.courseId}`, course);

 }

 deleteCourseById(courseId: number): Observable<any> {

  return this.http.delete<any>(`${this.apiUrl}/${courseId}`);

 }

 assignCourse(employeeId: string, courseId: number): Observable<any> {

  const payload = { employeeId, courseId };

  return this.http.post(this.assignmentApiUrl, payload);

 }
}






