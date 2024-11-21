import { CommonModule } from '@angular/common';



import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CourseService } from '../../service/course.service';

import { AssignmentService } from '../../service/assignment.service';

import { RouterLink, RouterOutlet } from '@angular/router';

import { NavBarAdminComponent } from "../nav-bar-admin/nav-bar-admin.component";

import { EmailService } from '../../service/email.service';

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

 imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, NavBarAdminComponent],

 providers:[AssignmentService],

 templateUrl: './assign-course.component.html',

 styleUrl: './assign-course.component.css'

})

export class AssignCourseComponent implements OnInit {

  courses: Course[] = [];

  employees: Employee[] = [];

  selectedCourseId: string | undefined;

  selectedEmployeeId: string | undefined;

  message: string | undefined;

  constructor(

   private assignmentService: AssignmentService,

   private emailService: EmailService 

  ) {}

  ngOnInit(): void {

   this.getCourses();

   this.getEmployees();

  }

 

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

  

  async assignCourse() {

   if (this.selectedCourseId && this.selectedEmployeeId) {

    const selectedCourse = this.courses.find(course => course.courseId.toString() === this.selectedCourseId);

    const selectedEmployee = this.employees.find(employee => employee.id === this.selectedEmployeeId);

    if (selectedCourse && selectedEmployee) {

     const payload = {

      courseId: this.selectedCourseId,

      employeeId: this.selectedEmployeeId

     };

     try {

      // Assign course to the employee (mocking success for simplicity)

      await this.assignmentService.assignCourseToEmployee(payload).toPromise();

      this.message = 'Course successfully assigned!';

      // Send email to the employee
      setTimeout(() => {

        window.location.reload();

      }, 1000);

      const emailPayload = {

       EmployeeId: selectedEmployee.email,

       name: selectedEmployee.userName,

       courseName: selectedCourse.title,

       endDate: selectedCourse.endDate

      };

      await this.emailService.sendAssignRequestEmail(emailPayload);

      alert('Email sent successfully to ' + selectedEmployee.email);

     } catch (error) {

      console.error('Error:', error);

      this.message = 'Failed to assign course or send email.';

     }

    } else {

     this.message = 'Selected course or employee not found.';

    }

   } else {

    this.message = 'Please select both a course and an employee.';

   }

  }

 }

  







