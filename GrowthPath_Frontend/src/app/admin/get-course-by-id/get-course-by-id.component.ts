import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-get-course-by-id',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './get-course-by-id.component.html',
  styleUrl: './get-course-by-id.component.css'
})
export class GetCourseByIdComponent {
  courseId: number = 0; // For the input field to specify course ID
  course: any = null;   // Store retrieved course data
  errorMessage: string = '';

  constructor(private courseService: CourseService) {}

  // Fetch course by ID
  getCourseById(): void {
    if (this.courseId) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (response) => {
          this.course = response;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error fetching course:', error);
          this.errorMessage = 'Course not found or error retrieving course.';
          this.course = null;
        }
      });
    }
  }
}
