// src/app/models/course.model.ts
export interface Course {
    courseId: number;
    title: string;
    description: string;
    endDate: string; // Use `string` type for dates in models to simplify data binding
  }
  