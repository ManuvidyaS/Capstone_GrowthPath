// src/app/service/feedback.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackUrl = 'http://localhost:7777/feedback-api'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  submitFeedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(this.feedbackUrl, feedbackData);
  }
}
