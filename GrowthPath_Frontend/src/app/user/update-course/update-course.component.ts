import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

export interface ApiResponse {
  isSuccess: boolean;
  message: string;
}

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink, NavBarComponent],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css',
})
export class UpdatecourseComponent implements OnInit {
  updateCourseForm: FormGroup;
  isLoading = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.updateCourseForm = new FormGroup({
      employeeId: new FormControl('', Validators.required),
      courseId: new FormControl(0, Validators.required),
      modulesCompleted: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.updateCourseForm.invalid) {
      return;
    }

    const { employeeId, courseId, modulesCompleted } = this.updateCourseForm.value;

    this.isLoading = true;

    this.userService.updateCourseProgress(employeeId, courseId, modulesCompleted).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.isSuccess) {
          this.successMessage = response.message;
          this.updateCourseForm.reset();

          // Navigate after a short delay
          setTimeout(() => {
            this.router.navigate(['/get-assigned-course']);
          }, 2000);
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred while updating progress.';
      }
    );
  }
}
