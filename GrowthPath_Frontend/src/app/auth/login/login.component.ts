import { Component } from '@angular/core';



import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';


@Component({

 selector: 'app-login',

 standalone: true,

 imports: [CommonModule,FormsModule],

 templateUrl: './login.component.html',

 styleUrl: './login.component.css'

})

export class LoginComponent {

 loginData = {

   userName: '',

   password: '',

 };


 errorMessage = '';


 constructor(private authService: AuthService, private router: Router) {}


 onLogin() {

   this.authService.login(this.loginData).subscribe({

     next: (response: any) => {

       this.authService.saveUserData(response.result);

       const role = response.result.role;

       if (role === 'Admin') {

         this.router.navigate(['/app-dashboard']);

       } else if (role === 'Employee') {

         this.router.navigate(['/app-layout']);

       }

     },

     error: (err) => {

       this.errorMessage = err.error?.message || 'Login failed.';

     },

   });


 }

}