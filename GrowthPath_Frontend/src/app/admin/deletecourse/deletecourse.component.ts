import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../service/course.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-deletecourse',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterLink],
  templateUrl: './deletecourse.component.html',
  styleUrl: './deletecourse.component.css'
})
export class DeletecourseComponent {
  courseId: number = 0; // Initialize with a default ID or let the user enter it
  resultMessage: string = '';

  constructor(private courseService: CourseService) {}

  // Method to delete course by ID
  deleteCourse() {
    if (!this.courseId) {
      alert('Please enter a valid Course ID');
      return;
    }

    this.courseService.deleteCourseById(this.courseId).subscribe({
      next: (response) => {
        this.resultMessage = `Course with ID ${this.courseId} has been successfully deleted.`;
        console.log(response);
        alert(this.resultMessage);
      },
      error: (error) => {
        this.resultMessage = `Failed to delete the course. Error: ${error.message}`;
        console.error(error);
        alert(this.resultMessage);
      },
      complete: () => {
        console.log('Delete request completed');
        // Redirect to a different page if needed
      }
    });
  }
}