import { Injectable } from '@angular/core';

import emailjs from '@emailjs/browser';

@Injectable({

 providedIn: 'root'

})

export class EmailService {

 constructor() {

  emailjs.init('Kmqp-G6xI8c8C_5CJ');

 }

 async sendAssignRequestEmail(userData: any) {

  try {

   const templateParams = {

    to_email: userData.EmployeeId,

    from_name:"Team Growth Path",

    message: `Dear ${userData.name},\n\nThe course "${userData.courseName}" has been assigned to you. Please complete it before the end date: ${userData.endDate}.\n\nBest regards,\nTeam GrowthPath`

   };

   const response = await emailjs.send(

    'service_mpg5tv7',

    'template_meggj1n',

    templateParams

   );

   console.log('Email sent successfully:', response);

   return response;

  } catch (error) {

   console.error('Error sending email:', error);

   throw error;

  }

 }

}



