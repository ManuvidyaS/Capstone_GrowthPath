import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';

import { AuthService } from '../../service/auth.service';
import { CourseService } from '../../service/course.service';

import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({

 selector: 'app-get-assigned-course',

 standalone: true,

 imports: [CommonModule,RouterLink,RouterOutlet,RouterLinkActive],

 templateUrl: './get-assigned-course.component.html',

 styleUrl: './get-assigned-course.component.css'

})

export class GetAssignedCourseComponent implements OnInit {
  assignedCourses: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.user.id) {
      this.userService.getAssignedCourses(currentUser.user.id).subscribe({
        next: (userdata: any) => {
          const assignedCourses = userdata.data; // Assuming the API wraps courses in a `data` field

          if (assignedCourses && assignedCourses.length > 0) {
            this.populateCourseDetails(assignedCourses);
          } else {
            this.loading = false;
            this.assignedCourses = [];
          }
        },
        error: () => {
          this.errorMessage = 'Failed to load assigned courses.';
          this.loading = false;
        },
      });
    } else {
      this.errorMessage = 'User not logged in.';
      this.loading = false;
    }
  }

  // Populate additional details for each assigned course
  private populateCourseDetails(assignedCourses: any[]): void {
    const courseDetailsRequests = assignedCourses.map((course) =>
      this.courseService.getCourseById(course.courseId).toPromise()
    );

    Promise.all(courseDetailsRequests)
      .then((courseDetailsArray) => {
        this.assignedCourses = assignedCourses.map((assignedCourse, index) => {
          const courseDetails = courseDetailsArray[index];
          return {
            ...assignedCourse,
            courseName: courseDetails?.title || 'N/A',
            courseDescription: courseDetails?.description || 'No description',
            totalModules: courseDetails?.totalModules || 0,
          };
        });
        this.loading = false;
      })
      .catch(() => {
        this.errorMessage = 'Error loading course details.';
        this.loading = false;
      });
  }
}