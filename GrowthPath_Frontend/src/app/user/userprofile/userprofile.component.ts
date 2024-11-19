import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AuthService } from '../../service/auth.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";



@Component({

 selector: 'app-userprofile',

 standalone: true,

 imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, LayoutComponent, NavBarComponent],

 templateUrl: './userprofile.component.html',

 styleUrl: './userprofile.component.css'

})

export class UserProfileComponent {

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