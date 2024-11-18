import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';  // Correct path to the service
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-get-course',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterOutlet, RouterLink],
  templateUrl: './get-course.component.html',
  styleUrl: './get-course.component.css'
})
export class GetCourseComponent implements OnInit {
  courses: any[] = [];  // Holds the list of courses

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    // Subscribing to the observable returned by courseService.getCourses()
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;  // Assign the response to the courses array
        console.log('Courses loaded:', this.courses);
      },
      (error) => {
        console.error('Error fetching courses:', error);  // Error handling
      }
    );
  }


}
