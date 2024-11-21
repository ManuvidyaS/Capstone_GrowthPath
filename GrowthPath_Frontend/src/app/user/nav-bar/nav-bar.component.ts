import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
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

