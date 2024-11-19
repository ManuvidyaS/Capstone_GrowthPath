import { Component } from '@angular/core';



import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavBarAdminComponent } from "../nav-bar-admin/nav-bar-admin.component";


@Component({

 selector: 'app-profile',

 standalone: true,

 imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, DashboardComponent, NavBarAdminComponent],

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