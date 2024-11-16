import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CourseService } from '../../service/course.service';
//add the dto connection to the fronted component

export interface ResponseDTO {
  IsSuccess: boolean;
  message: string;
}
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,DashboardComponent,RouterLink],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  userObj:any={
    CourseId:0,
    Title:'',
    Description:'',
    EndDate:'',
    TotalModules:0
  };
  http = inject(HttpClient);
  resultObj: ResponseDTO | undefined;

  constructor(  
    private router:Router,
    private ser:CourseService,
  ) {}

  onSubmit() {
    this.http.post<ResponseDTO>("http://localhost:7777/learning-api/course", this.userObj)
      .subscribe({
        next: (res: ResponseDTO) => {
          this.resultObj = res;
          console.log(this.resultObj);


          if (this.resultObj.IsSuccess) {
            alert("New Course Added Successfully");
            this.router.navigate(['/app-dashboard']);   
            localStorage.setItem('Course', this.userObj.title);
           } else {
            alert(this.resultObj.message || 'Something went wrong');
          }
        }
});
}
}
