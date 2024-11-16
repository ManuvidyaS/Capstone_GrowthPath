import { Component, OnInit, inject } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../Models/Course';

@Component({
  selector: 'app-put-course',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './put-course.component.html',
  styleUrl: './put-course.component.css'
})
export class PutCourseComponent  {
  courseId: number = 0;
  course: Course | null = null; // Initially, no course is selected for editing

  constructor(private courseService: CourseService) {}

  // Step 1: Fetch course details based on courseId
  fetchCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe(
      (data: Course) => {
        this.course = data;
      },
      (error) => {
        alert('Course not found. Please enter a valid Course ID.');
        console.error('Error fetching course:', error);
      }
    );
  }

  // Step 2: Submit the updated course details
  onSubmit(): void {
    if (this.course) {
      this.courseService.updateCourse(this.course).subscribe(
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
}