import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';



import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PublicService } from '../../service/public.service';



@Component({

 selector: 'app-recommend-course',

 standalone: true,

 imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],

 templateUrl: './recommend-course.component.html',

 styleUrl: './recommend-course.component.css'

})

export class RecommendCourseComponent implements OnInit {

 courses: { id: string; slug: string; name: string }[] = [];


 constructor(private publicService: PublicService) {}


 ngOnInit(): void {

   this.publicService.getCourses().subscribe((data: { elements: any[]; }) => {

     this.courses = data.elements.map((course: any) => ({

       id: course.id,

       slug: course.slug,

       name: course.name,

     }));

   });

 }

}