import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CourseService } from '../../service/course.service';

import { AssignmentService } from '../../service/assignment.service';
import { RouterLink, RouterOutlet } from '@angular/router';

export interface Course {

 courseId: number;

 title: string;

 description: string;

 endDate: string;

}

export interface Employee {

 id: string; // assuming 'id' is a string (you can adjust based on your actual data type)

 userName: string;

 email: string;

}

@Component({

 selector: 'app-assign-course',

 standalone: true,

 imports: [CommonModule,FormsModule,RouterOutlet,RouterLink],

 providers:[AssignmentService],

 templateUrl: './assign-course.component.html',

 styleUrl: './assign-course.component.css'

})

export class AssignCourseComponent implements OnInit {

 courses: Course[] = []; // Define the type as Course[]

 employees: Employee[] = []; // Define the type as Employee[]

 selectedCourseId: string | undefined;

 selectedEmployeeId: string | undefined;

 message: string | undefined;

 constructor(

  private assignmentService: AssignmentService

 ) {}

 ngOnInit(): void {

  // Fetch the list of courses and employees

  this.getCourses();

  this.getEmployees();

 }

 // Fetch courses from the backend

 getCourses() {

  this.assignmentService.getCourses().subscribe({

   next: (data) => {

    this.courses = data;

   },

   error: (error) => {

    console.error('Error fetching courses:', error);

   }

  });

 }

 // Fetch employees from the backend

 getEmployees() {

  this.assignmentService.getEmployees().subscribe({

   next: (data) => {

    this.employees = data;

   },

   error: (error) => {

    console.error('Error fetching employees:', error);

   }

  });

 }

 // Assign the selected course to the selected employee

 assignCourse() {

  if (this.selectedCourseId && this.selectedEmployeeId) {

   const payload = {

    courseId: this.selectedCourseId,

    employeeId: this.selectedEmployeeId

   };

   this.assignmentService.assignCourseToEmployee(payload).subscribe({

    next: (response) => {

     // Check if the response indicates success

     if (response.isSuccess) {

      this.message = 'Course successfully assigned!';

     } else {

      this.message = response.message || 'Failed to assign course.';

     }

    },

    error: (error) => {

     console.error('Error assigning course:', error);

     this.message = 'Failed to assign course.';

    }

   });

  } else {

   this.message = 'Please select both a course and an employee.';

  }

 }

}




