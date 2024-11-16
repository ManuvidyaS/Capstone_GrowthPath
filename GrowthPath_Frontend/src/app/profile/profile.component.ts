import { Component } from '@angular/core';

import { AuthService } from '../service/auth.service';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';


@Component({

 selector: 'app-profile',

 standalone: true,

 imports: [CommonModule,FormsModule],

 templateUrl: './profile.component.html',

 styleUrl: './profile.component.css'

})

export class ProfileComponent {

 userData: any; // Store user data here

 user: any;


 constructor(private authService: AuthService) {}


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