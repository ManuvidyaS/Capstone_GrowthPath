import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FeedbackService } from '../../service/feedback.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet, NavBarComponent],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [FeedbackService]
})
export class FeedbackComponent {
  rating: number = 0;
  suggestion: string = '';
  courseId: number = 1;

  userData: any;
  user: any;
  userId: any;

  constructor(private feedbackService: FeedbackService, private snackBar: MatSnackBar,private authService: AuthService) {}

  onSubmitFeedback() {
    const feedbackData = {
      rating: this.rating,
      suggestion: this.suggestion,
      courseId: this.courseId,
      userId: this.userId // Replace with actual user ID
    };

    this.feedbackService.submitFeedback(feedbackData).pipe(
      tap(response => {
        console.log('Feedback submitted successfully', response);
        this.snackBar.open('Feedback submitted successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }),
      catchError(error => {
        console.error('Feedback submission failed', error);
        this.snackBar.open('Feedback submission failed', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        return of(null);
      })
    ).subscribe();
  }
  ngOnInit(): void {

    // Fetch user data from local storage using AuthService
 
    const currentUser = this.authService.getCurrentUser();
 
 
    // Checking if the currentUser object exists and extracting the user data
 
    if (currentUser && currentUser.user) {
 
      this.userData = currentUser.user;
 
      this.user=currentUser; // Accessing the nested user data
 
    }
 
 }
 
 
}
