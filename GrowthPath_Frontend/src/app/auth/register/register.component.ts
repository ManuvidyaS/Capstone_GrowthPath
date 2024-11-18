import { Component } from '@angular/core';



import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';


@Component({

 selector: 'app-register',

 standalone: true,

 imports: [CommonModule,FormsModule,RouterOutlet,RouterLink],

 templateUrl: './register.component.html',

 styleUrl: './register.component.css'

})

export class RegisterComponent {

 registerData = {

   email: '',

   password: '',

   name: '',

   phoneNumber: '',

   role: 'Employee',

 };


 successMessage = '';

 errorMessage = '';


 constructor(private authService: AuthService, private router: Router) {}


 onRegister() {

   this.authService.register(this.registerData).subscribe({

     next: () => {

       this.successMessage = 'Registration successful!';

       this.errorMessage = '';

       this.router.navigate(['/login']);

     },

     error: (err) => {

       this.errorMessage = err.error?.message || 'Registration failed.';

     },

   });

 }
}