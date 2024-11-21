import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../service/course.service'; // Correct path to the service

import { CommonModule, DatePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { NavBarAdminComponent } from "../nav-bar-admin/nav-bar-admin.component";

import { HttpClient } from '@angular/common/http';
import { Course } from '../Models/Course';

@Component({

 selector: 'app-get-course',

 standalone: true,

 imports: [CommonModule, FormsModule, DatePipe, RouterOutlet, RouterLink, NavBarAdminComponent],

 templateUrl: './get-course.component.html',

 styleUrl: './get-course.component.css'

})

export class GetCourseComponent implements OnInit {

 courses: any[] = []; // Holds the list of courses

 constructor(private courseService: CourseService, private router: Router,private http: HttpClient) {}

 ngOnInit(): void {

  // Subscribing to the observable returned by courseService.getCourses()

  this.courseService.getCourses().subscribe(

   (data) => {

    this.courses = data; // Assign the response to the courses array

    console.log('Courses loaded:', this.courses);

   },

   (error) => {

    console.error('Error fetching courses:', error); // Error handling

   }

  );

 }

 DeleteCourse(index: number): void {

  if (confirm('Are you sure you want to delete this report?')) {

   const API_URL = `http://localhost:7777/learning-api/course/${index}`;

   const Assign_URL=`http://localhost:7777/assignment-api/get-assigned-courses/${index}`;

   

   this.http.delete(API_URL).subscribe({

   next: () => {

    console.log('Course deleted successfully.');

    // After course deletion, delete related assignments

    this.http.delete(Assign_URL).subscribe({

     next: () => {

      console.log('All course assignments deleted successfully.');

      this.ngOnInit(); // Reload the course list

     },

     error: (error) => {

      console.error('Error deleting course assignments:', error);

      alert('Course deleted, but failed to delete assignments.');

     }

    });

   },

   error: (error) => {

    console.error('Error deleting course:', error);

    alert('Failed to delete course. Please try again.');

   }

  });

}

 }

 PutCourse(course:Course):void {
  this.courseService.updateCourse(course).subscribe(
    (response) => {
      alert('Course updated successfully');
    },
    (error) => {
      console.error('Error updating course:', error);
      alert('Failed to update course');
    }
  );

}
}
















