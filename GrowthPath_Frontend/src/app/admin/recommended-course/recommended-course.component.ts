import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';



import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PublicService } from '../../service/public.service';
import { NavBarAdminComponent } from "../nav-bar-admin/nav-bar-admin.component";



@Component({

 selector: 'app-recommended-course',

 standalone: true,

 imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, NavBarAdminComponent],

 templateUrl: './recommended-course.component.html',

 styleUrl: './recommended-course.component.css'

})

export class RecommendedCourseComponent implements OnInit {

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