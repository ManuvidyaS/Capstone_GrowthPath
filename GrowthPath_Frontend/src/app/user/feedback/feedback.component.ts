import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FeedbackService } from '../../service/feedback.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterOutlet],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [FeedbackService]
})
export class FeedbackComponent {
  rating: number = 0;
  suggestion: string = '';
  courseId: number = 1;
userId: any;


  constructor(private feedbackService: FeedbackService, private snackBar: MatSnackBar) {}

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
}
