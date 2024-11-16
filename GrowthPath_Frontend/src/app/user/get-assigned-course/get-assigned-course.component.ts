import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';

import { AuthService } from '../../service/auth.service';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';


@Component({

 selector: 'app-get-assigned-course',

 standalone: true,

 imports: [CommonModule,RouterLink],

 templateUrl: './get-assigned-course.component.html',

 styleUrl: './get-assigned-course.component.css'

})

export class GetAssignedCourseComponent implements OnInit {

 assignedCourses: any[] = [];

 loading: boolean = true;

 errorMessage: string = '';


 constructor(private userService: UserService, private authService: AuthService) {}


 ngOnInit(): void {

   const currentUser = this.authService.getCurrentUser();


   if (currentUser && currentUser.user.id) {

     this.userService.getAssignedCourses(currentUser.user.id).subscribe(

       (userdata: any) => {

         this.assignedCourses = userdata.data; // Assuming the API wraps courses in a `data` field

         this.loading = false;

       },

       (error) => {

         this.errorMessage = 'Failed to load assigned courses.';

         this.loading = false;

       }

     );

   } else {

     this.errorMessage = 'User not logged in.';

     this.loading = false;

   }

 }

    }