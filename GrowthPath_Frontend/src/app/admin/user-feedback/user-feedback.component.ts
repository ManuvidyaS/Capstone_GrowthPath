import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-feedback',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,FormsModule],
  templateUrl: './user-feedback.component.html',
  styleUrl: './user-feedback.component.css'
})
export class UserFeedbackComponent implements OnInit {
  feedbacks: any[] = []; // To hold feedback data
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFeedbacks();
  }

  fetchFeedbacks() {
    this.http.get<any[]>('http://localhost:7726/api/Feedback').subscribe({
      next: (data) => {
        this.feedbacks = data; // Bind data to the template
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch feedbacks. Please try again later.';
        console.error(error);
      }
    });
  }
}